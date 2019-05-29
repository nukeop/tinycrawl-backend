import mongoose from 'mongoose';

import { BadRequest, NotFound } from '../errors';
import {
  requireToken,
  validateSchema
} from '../middleware/routeDecorators';
import { handleMongooseErrors } from '../utils';
import { postHeroSchema, buyTraitSchema } from '../schemas/heroes';
import { buyTrait } from '../game/traits';

var Hero = mongoose.model('Hero');
var HeroClass = mongoose.model('HeroClass');
var Trait = mongoose.model('Trait');

function createEndpoint(router) {
  router.post('/heroes',
    requireToken,
    validateSchema(postHeroSchema),
    (req, res) => {
      HeroClass
        .findOne({name: req.body.heroClass})
        .populate('slots')
        .populate('moves')
        .populate('abilities')
        .then(heroClass => {
          if (!heroClass) {
            BadRequest(res, `Hero class ${req.body.heroClass} does not exist`);
            return;
          }

          let hero = new Hero({
            user: req.authorizedByToken._id,
            name: req.body.name,
            heroClass: heroClass._id,
            baseHp: heroClass.baseHp,
            currentHp: heroClass.baseHp,
            baseAttack: heroClass.baseAttack,
            baseDefense: heroClass.baseDefense,
            level: 1,
            experience: 0,
            slots: heroClass.slots,
            traits: [],
            traitPoints: 1,
            moves: heroClass.moves,
            abilities: heroClass.abilities
          });

          hero.save()
            .then(() => {
              res.status(201).json(hero.serialize());
            })
            .catch(handleMongooseErrors(res));
        })
        .catch(handleMongooseErrors(res));
    });

  router.get('/heroes/:uuid', (req, res) => {
    Hero
      .findById(req.params.uuid)
      .populate('heroClass')
      .populate('stats')
      .populate('slots')
      .populate('traits')
      .populate('moves')
      .populate('abilities')
      .then(hero => {
        if (!hero) {
          NotFound(res);
        } else {
          res.status(200).json({ heroes: [
            hero.serialize()
          ]});
        }
      });
  });

  router.delete('/heroes/:uuid',
    requireToken,
    (req, res) => {
      Hero.findById(req.params.uuid)
        .then(hero => {
          return hero.remove();
        })
        .then(() => {
          res.status(204).send();
        })
        .catch(handleMongooseErrors(res));
    });

  router.post('/heroes/:uuid/buyTrait',
    requireToken,
    validateSchema(buyTraitSchema),
    async (req, res) => {
      let hero = await Hero.findById(req.params.uuid);
      const owner = hero.user;
      const trait = await Trait.findById(req.body.traitId);
      
      if(!_.isEqual(owner._id, req.authorizedByToken._id)) {
        BadRequest(res, 'Only the owner of a hero can modify it');
        return;
      }
      try {
        await buyTrait(hero, trait);
      } catch(err) {
        BadRequest(res, err.message);
        return;
      }
      
      hero = await Hero.findById(req.params.uuid);
      res.status(200).json(hero.serialize());
    });

  console.log('Endpoints for heroes created');
}

export default createEndpoint;

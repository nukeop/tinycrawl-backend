import mongoose from 'mongoose';

import { BadRequest, NotFound } from '../errors';
import { requiredParams, requireToken } from '../middleware/routeDecorators';
import { handleMongooseErrors } from '../utils';
import { createCRUDforResource } from './meta';

var Hero = mongoose.model('Hero');
var HeroClass = mongoose.model('HeroClass');

function createEndpoint(router) {
  router.post('/heroes',
    requiredParams(['name', 'heroClass']),
    requireToken,
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

  console.log('Endpoints for heroes created');
}

export default createEndpoint;

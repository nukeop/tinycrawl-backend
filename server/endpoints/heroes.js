import _ from 'lodash';
import mongoose from 'mongoose';

import { Hero } from '../models';
import { BadRequest, NotFound } from '../errors';
import { requiredParams, requireAuthentication } from '../middleware/routeDecorators';
import { handleMongooseErrors } from '../utils';

var mongoose_Hero = mongoose.model('Hero');
var HeroClass = mongoose.model('HeroClass');
var User = mongoose.model('User');

function createEndpoint(router) {
  router.get('/heroes', (req, res) => {
    mongoose_Hero
    .find({})
    .populate('heroClass')
    .populate('stats')
    .populate('slots')
    .populate('traits')
    .populate('moves')
    .populate('abilities')
    .then(heroes => {
      res.status(200).json({ heroes: _.map(heroes, hero => hero.serialize())});
    });
  });

  router.post('/heroes',
  requiredParams(['name', 'heroClass']),
  requireAuthentication,
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
	
	let hero = new mongoose_Hero({
	  user: req.authorizedUser._id,
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
    res.status(200).json({ heroes: db.get('heroes').filter({ uuid: req.params.uuid }).value() });
  });

  router.delete('/heroes/:uuid', (req, res) => {
    db.get('heroes').remove({ uuid: req.params.uuid }).write();
    res.status(204).json();
  });

  _.forEach({traits: 'trait', moves: 'move'}, (value, key) => {
    router.get(`/heroes/:uuid/${key}`, (req, res) => {
      res.status(200).json({ [`${key}`]: db.get('heroes').filter({ uuid: req.params.uuid }).head().value()[`${key}`] });
    });

    router.post(`/heroes/:uuid/${key}/:${value}Name`, (req, res) => {
      let item = db.get(`definitions.${key}`).filter({ name: req.params[`${value}Name`] }).head().value();
      let hero = db.get('heroes').filter({ uuid: req.params.uuid }).head().value();

        if (!item) {
          BadRequest(res, `${value} ${req.params[`${value}Name`] } not found`);
          return;
        }

        if (!hero) {
          BadRequest(res, `Hero with uuid ${req.params.uuid} not found`);
          return;
        }

      hero[`${key}`].push(item);
      db.get('heroes').remove({uuid: hero.uuid}).write();
      db.get('heroes').push(hero).write();

      res.status(200).json(hero);
    });

    router.delete(`/heroes/:uuid/${key}/:${value}Name`, (req, res) => {
      let hero = db.get('heroes').filter({ uuid: req.params.uuid }).head().value();
      hero[`${key}`] = _.filter(hero[`${key}`], item => item.name !== req.params[`${value}Name`]);
      db.get('heroes').find({uuid: hero.uuid}).assign(hero).write();

      res.status(200).json(hero);
    });
  });

  console.log('Endpoints for heroes created');
}

export default createEndpoint;

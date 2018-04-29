import _ from 'lodash';
import mongoose from 'mongoose';

import { Hero } from '../models';
import { BadRequest, NotFound } from '../errors';
import { requiredParams } from '../middleware/routeDecorators';
import * as dummy from '../models/mongoose/hero';


var mongoose_Hero = mongoose.model('Hero');

function createEndpoint(router) {
  router.get('/heroes', (req, res) => {
    res.status(200).json({ heroes:db.get('heroes').value()});
  });

  router.post('/heroes',
  requiredParams(['name', 'heroDefinition', 'userUuid']),
  (req, res) => {
    let definition = db.get('definitions.heroes').filter({name: req.body.heroDefinition}).head().value();

    if (definition === undefined) {
      BadRequest(res, `Hero class ${req.body.heroDefinition} does not exist`);
      return;
    }

    let user = db.get('users').filter({uuid: req.body.userUuid}).head().value();

    if (user === undefined) {
      BadRequest(res, 'User with this uuid does not exist');
      return;
    }

    let hero = new Hero({
      userUuid: req.body.userUuid,
      name: req.body.name,
      heroDefinition: definition
    });
    hero.save();

    res.status(201).json(hero.serialize());
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

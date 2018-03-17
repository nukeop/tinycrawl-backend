import _ from 'lodash';
import { Hero } from '../models';
import { NotFound } from '../errors';
import { checkRequiredParams } from '../utils';

function createEndpoint(router, db) {
  router.get('/heroes', (req, res) => {
    res.status(200).json({ heroes:db.get('heroes').value()});
  });

  router.get('/heroes/:uuid', (req, res) => {
    res.status(200).json({ heroes: db.get('heroes').filter({ uuid: req.params.uuid }).value() });
  });

  router.get('/heroes/:uuid/traits', (req, res) => {
    res.status(200).json({ traits: db.get('heroes').filter({ uuid: req.params.uuid }).head().value().traits });
  });

  router.post('/heroes/:uuid/traits/:traitName', (req, res) => {
    let trait = db.get('definitions.traits').filter({ name: req.params.traitName }).head().value();
    let hero = db.get('heroes').filter({ uuid: req.params.uuid }).head().value();

    hero.traits.push(trait);
    db.get('heroes').remove({uuid: hero.uuid}).write();
    db.get('heroes').push(hero).write();

    res.status(200).json(hero);
  });

  router.delete('/heroes/:uuid/traits/:traitName', (req, res) => {
    let hero = db.get('heroes').filter({ uuid: req.params.uuid }).head().value();
    hero.traits = _.filter(hero.traits, trait => trait.name !== req.params.traitName);
    db.get('heroes').remove({uuid: hero.uuid}).write();
    db.get('heroes').push(hero).write();

    res.status(200).json(hero);
  });

  router.post('/heroes', (req, res) => {
    if(!checkRequiredParams(req, res, ['name', 'heroDefinition', 'userUuid'])) {
      return;
    }

    let definition = db.get('definitions.heroes').filter({name: req.body.heroDefinition}).head().value();

    if (definition === undefined) {
      NotFound(res, `Hero class ${req.body.heroDefinition} does not exist`);
      return;
    }

    let user = db.get('users').filter({uuid: req.body.userUuid}).head().value();

    if (user === undefined) {
      NotFound(res, 'User with this uuid does not exist');
      return;
    }

    let hero = new Hero({
      userUuid: req.body.userUuid,
      name: req.body.name,
      heroDefinition: definition
    });
    hero.save();

    res.status(200).json(hero.serialize());
  });

  console.log('Endpoints for heroes created');
}

export default createEndpoint;

import { Hero } from '../models';
import { NotFound } from '../errors';

function createEndpoint(router, db) {
  router.get('/heroes', (req, res) => {
    res.status(200).json({ heroes:db.get('heroes').value()});
  });

  router.get('/heroes/:uuid', (req, res) => {
    res.status(200).json({ heroes: db.get('heroes').filter({ uuid: req.params.uuid }).value() });
  });

  router.post('/heroes/:heroDefinition/:name/:userUuid', (req, res) => {
    let definition = db.get('definitions.heroes').filter({name: req.params.heroDefinition}).head().value();

    if (definition === undefined) {
      NotFound(res, `Hero class ${req.params.heroDefinition} does not exist`);
      return;
    }

    let user = db.get('users').filter({uuid: req.params.userUuid}).head().value();

    if (user === undefined) {
      NotFound(res, 'User with this uuid does not exist');
      return;
    }

    let hero = new Hero({
      userUuid: req.params.userUuid,
      name: req.params.name,
      heroDefinition: definition
    });
    hero.save();

    res.status(200).json(hero.serialize());
  });

  console.log('Endpoints for heroes created');
}

export default createEndpoint;

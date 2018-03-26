import { User } from '../models';

function createEndpoint(router, db) {
  router.get('/users', (req, res) => {
    res.status(200).json({ users: db.get('users').value() });
  });

  router.get('/users/:uuid', (req, res) => {
    res.status(200).json({ users: db.get('users').filter({uuid: req.params.uuid}).value() });
  });

  router.get('/users/:uuid/heroes', (req, res) => {
    res.status(200).json({ heroes: db.get('heroes').filter({userUuid: req.params.uuid}).value() });
  });

  router.post('/users', (req, res) => {
    let user = new User({});
    user.save();
    res
    .status(200)
    .json(user.serialize());
  });

  console.log('Endpoints for users created');
}

export default createEndpoint;

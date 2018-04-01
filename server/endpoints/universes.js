import _ from 'lodash';
import { Universe, Marker } from '../models';
import { BadRequest, NotFound } from '../errors';
import { checkRequiredParams } from '../utils';

function createEndpoint(router) {
  router.get('/universes', (req, res) => {
    res.status(200).json({ universes: db.get('universes').value() });
  });

  router.get('/universes/:uuid', (req, res) => {
    res.status(200).json({ universes: db.get('universes').filter({uuid: req.params.uuid}).value() });
  });

  router.delete('/universes/:uuid', (req, res) => {
    db.get('universes').remove({ uuid: req.params.uuid }).write();
    res.status(204).json();
  });

  router.post('/universes', (req, res) => {
    if(!checkRequiredParams(req, res, ['userUuid'])) {
      return;
    }

    let user = db.get('users').filter({uuid: req.body.userUuid}).head().value();

    if (user === undefined) {
      BadRequest(res, 'User with this uuid does not exist');
      return;
    }

    let universe = new Universe({userUuid: req.body.userUuid});
    universe.save();
    res.status(201).json(universe.serialize());
  });

  router.get('/universes/:uuid/markers', (req, res) => {
    return res.status(200).json({ markers: db.get(Marker.table).filter({universeUuid: req.params.uuid}).value() });
  })

  console.log('Endpoints for universes created');
}

export default createEndpoint;

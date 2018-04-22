import _ from 'lodash';
import { BadRequest } from '../errors';
import { StarSystem, Universe } from '../models';
import { requiredParams } from '../middleware/routeDecorators';

function createEndpoint(router) {
  router.get('/starSystems', (req, res) => {
    res.status(200).json({ starSystems: db.get('starSystems').values() });
  });

  router.get('/starSystems/:uuid', (req, res) => {
    res.status(200).json({ starSystems: db.get('starSystems').filter({uuid: req.params.uuid}).value() });
  });

  router.delete('/starSystems/:uuid', (req, res) => {
    db.get('starSystems').remove({ uuid: req.params.uuid }).write();
    res.status(204).json();
  });

  router.post('/starSystems',
  requiredParams(['universeUuid', 'name', 'positionX', 'positionY']),
  (req, res) => {
    let universe = db.get(Universe.table).filter({uuid: req.body.universeUuid}).head().value();

    if (universe === undefined) {
      BadRequest(res, 'Universe with this uuid does not exist');
      return;
    }

    let starSystem = new StarSystem(req.body);
    starSystem.save();

    res.status(201).json(starSystem.serialize());
  });
}

export default createEndpoint;

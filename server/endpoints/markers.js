import _ from 'lodash';
import { Marker, Universe } from '../models';
import { enumAllowedMarkerTypes } from '../models/marker';
import { checkRequiredParams, checkEnum } from '../utils';

function createEndpoint(router) {
  router.get('/markers', (req, res) => {
    res.status(200).json({ markers: db.get('markers').values() });
  });

  router.get('/markers/:uuid', (req, res) => {
    res.status(200).json({ markers: db.get('markers').filter({ uuid: req.params.uuid }).values() });
  });

  router.post('/markers', (req, res) => {
    if(!checkRequiredParams(req, res, ['universeUuid', 'name', 'type'])) {
      return;
    }

    if(!checkEnum(res, 'type', req.body.type, enumAllowedMarkerTypes)) {
      return;
    }

    let universe = db.get(Universe.table).filter({uuid: req.body.universeUuid}).head().value();

    if (universe === undefined) {
      BadRequest(res, 'Universe with this uuid does not exist');
      return;
    }

    let marker = new Marker({
      universeUuid: req.body.universeUuid,
      name: req.body.name,
      type: req.body.type
    });
    marker.save();

    res.status(201).json(marker.serialize());
  });

  console.log('Endpoints for markers created');
}

export default createEndpoint;

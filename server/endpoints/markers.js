import _ from 'lodash';
import { Marker, Universe } from '../models';
import { BadRequest, NotFound } from '../errors';
import { enumAllowedMarkerTypes } from '../models/marker';
import { requiredParams, enumParam } from '../middleware/routeDecorators';
function createEndpoint(router) {
  router.get('/markers', (req, res) => {
    res.status(200).json({ markers: db.get('markers').values() });
  });

  router.get('/markers/:uuid', (req, res) => {
    res.status(200).json({ markers: db.get('markers').filter({ uuid: req.params.uuid }).values() });
  });

  router.delete('/markers/:uuid', (req, res) => {
    db.get('markers').remove({ uuid: req.params.uuid }).write();
    res.status(204).json();
  });

  router.post('/markers',
  enumParam('type', _.values(enumAllowedMarkerTypes)),
  requiredParams(['universeUuid', 'name', 'type']),
  (req, res) => {
    let universe = db.get(Universe.table).filter({uuid: req.body.universeUuid}).head().value();

    if (universe === undefined) {
      BadRequest(res, 'Universe with this uuid does not exist');
      return;
    }

    let parent = null;
    if(req.body.parentMarker) {
      parent = db.get('markers').find({uuid: req.body.parentMarker}).value();
      if(!parent) {
        NotFound(res, `Marker with uuid ${req.body.parentMarker} doesn't exist`);
        return;
      }
    }

    let marker = new Marker({
      universeUuid: req.body.universeUuid,
      name: req.body.name,
      type: req.body.type,
      parentMarker: req.body.parentMarker
    });
    marker.save();

    if(parent) {
      parent.satellites.push(marker.uuid);
      db.get('markers').find({uuid: marker.parentMarker}).assign(parent).write();
    }

    res.status(201).json(marker.serialize());
  });

  console.log('Endpoints for markers created');
}

export default createEndpoint;

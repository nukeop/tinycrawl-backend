import mongoose from 'mongoose';
import _ from 'lodash';

import { requiredParams, requireAuthentication } from
'../middleware/routeDecorators';
import { handleMongooseErrors } from '../utils';
import { createCRUDforResource } from './meta';

var Note = mongoose.model('Note');
var NoteConjunction = mongoose.model('NoteConjunction');
var NotePhrase = mongoose.model('NotePhrase');
var NoteStructure = mongoose.model('NoteStructure');


function createEndpoint(router) {
  createCRUDforResource(router, [], 'notes', Note);

  router.get('/notes/strings', async (req, res) => {
    Note.find({})
      .then(async instances => {
        const notes = await Promise.all(_.map(instances, instance =>
                                              instance.construct()));
        
        res.status(200).json({ notes });
      })
      .catch(handleMongooseErrors(res));
  });
  
  router.post('/notes',
    requiredParams([
      'structures',
      'phrases'
    ]),
    requireAuthentication,
              (req, res) => {
                const note = new Note({
                  author: req.authorizedUser._id,
        ...req.body
      });

      note.save()
      .then(() => {
        res.status(201).json(note.serialize());
      })
      .catch(handleMongooseErrors(res));
    });

  console.log('Endpoints for notes created');
}

export default createEndpoint;

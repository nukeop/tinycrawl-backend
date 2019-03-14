import mongoose from 'mongoose';
import format from 'string-template';
import _ from 'lodash';

import { serializeAll } from '../helpers';

var NoteSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  structures: [{ type: mongoose.Schema.Types.ObjectId, ref:
                 'NoteStructure' }],
  conjuction: { type: mongoose.Schema.Types.ObjectId, ref:
                 'NoteConjunction' },
  phrases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NotePhrase'
  }],
  positiveRatings: { type: Number, default: 0 },
  negativeRatings: { type: Number, default: 0 }
}, { timestamps: true });

NoteSchema.methods.serialize = function() {
  return {
    id: this._id,
    author: this.author,
    structures: serializeAll(this.structures),
    conjuction: this.conjuction.serialize(),
    phrases: serializeAll(this.phrases),
    positiveRatings: this.positiveRatings,
    negativeRatings: this.negativeRatings
  };
};

NoteSchema.methods.construct = async function() {
  const structuresQueries = _.map(this.structures, structure =>
    this.model('NoteStructure').findById(structure));
  const phrasesQueries = _.map(this.phrases, phrase =>
    this.model('NotePhrase').findById(phrase));
  const conjunctionQuery = this.model('NoteConjunction').findById(this.conjunction);

  const structures = await Promise.all(structuresQueries);
  const phrases = await Promise.all(phrasesQueries);
  const conjunction = await conjunctionQuery;

  let note = '';
  
  if(conjunction) {
    note = _.join(
      _.map(structures, 'structure'),
      conjunction.conjunction
    );
  } else {
    note = _.head(structures).structure;
  }

  let slot = 0;
  const enumerateSlots = () => {
    return '{' + slot + '}';
  };
  note = note.split('{}');
  note = _.reduce(note, (noteSoFar, token) => {
    return noteSoFar + enumerateSlots() + token;
  });
  
  note = format(note, _.map(phrases, 'singular'));
  return note;
};

var Note = mongoose.model('Note', NoteSchema);
export default Note;

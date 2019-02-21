import mongoose from 'mongoose';

var NoteSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  structures: [{ type: mongoose.Schema.Types.ObjectId, ref:
                 'NoteStructure' }],
  conjuction: [{ type: mongoose.Schema.Types.ObjectId, ref:
                 'NoteConjunction' }],
  phrases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NotePhrase'
  }],
  positiveRatings: { type: Number, default: 0 },
  negativeRatings: { type: Number, default: 0 }
}, { timestamps: true });

NoteSchema.methods.serialize = function() {
  return {
    id: this._id,
    author: this.author,
    structures: this.structures,
    conjuction: this.conjuction,
    phrases: this.phrases,
    positiveRatings: this.positiveRatings,
    negativeRatings: this.negativeRatings
  };
};

var Note = mongoose.model('Note', NoteSchema);
export default Note;

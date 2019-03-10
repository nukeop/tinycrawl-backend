import mongoose from 'mongoose';

var NotePhraseSchema = mongoose.Schema({
  category: { type: String },
  singular: { type: String },
  plural: { type: String }
}, { timestamps: true });

NotePhraseSchema.methods.serialize = function() {
  return {
    id: this._id,
    category: this.category,
    singular: this.singular,
    plural: this.plural
  };
};

var NotePhrase = mongoose.model('NotePhrase', NotePhraseSchema);
export default NotePhrase;

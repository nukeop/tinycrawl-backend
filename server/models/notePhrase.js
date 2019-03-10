import mongoose from 'mongoose';

var NotePhraseSchema = mongoose.Schema({
  name: { type: String },
  category: { type: String },
  singular: { type: String },
  plural: { type: String }
}, { timestamps: true });

NotePhraseSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    category: this.category,
    singular: this.singular,
    plural: this.plural
  };
};

var NotePhrase = mongoose.model('NotePhrase', NotePhraseSchema);
export default NotePhrase;

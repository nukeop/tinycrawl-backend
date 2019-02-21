import mongoose from 'mongoose';

var NotePhraseSchema = mongoose.Schema({
  category: { type: String },
  singular: { type: String },
  plural: { type: String }
}, { timestamps: true });

var NotePhrase = mongoose.model('NotePhrase', NotePhraseSchema);
export default NotePhrase;

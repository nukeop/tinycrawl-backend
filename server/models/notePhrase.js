import mongoose from 'mongoose';

var NotePhraseSchema = mongoose.Schema({
  phrase: { type: String }
}, { timestamps: true });

var NotePhrase = mongoose.model('NotePhrase', NotePhraseSchema);
export default NotePhrase;

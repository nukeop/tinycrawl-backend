import mongoose from 'mongoose';

var NoteConjunctionSchema = mongoose.Schema({
  conjunction: { type: String }
}, { timestamps: true });

var NoteConjunction = mongoose.model('NoteConjunction', NoteConjunctionSchema);
export default NoteConjunction;

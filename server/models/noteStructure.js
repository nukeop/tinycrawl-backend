import mongoose from 'mongoose';

var NoteStructureSchema = mongoose.Schema({
  structure: { type: String }
}, { timestamps: true });

var NoteStructure = mongoose.model('NoteStructure', NoteStructureSchema);
export default NoteStructure;

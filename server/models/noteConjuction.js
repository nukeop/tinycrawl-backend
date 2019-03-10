import mongoose from 'mongoose';

var NoteConjunctionSchema = mongoose.Schema({
  name: { type: String },
  conjunction: { type: String }
}, { timestamps: true });

NoteConjunctionSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    conjunction: this.conjunction
  };
};

var NoteConjunction = mongoose.model('NoteConjunction', NoteConjunctionSchema);
export default NoteConjunction;

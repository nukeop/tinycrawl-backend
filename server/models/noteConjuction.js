import mongoose from 'mongoose';

var NoteConjunctionSchema = mongoose.Schema({
  conjunction: { type: String }
}, { timestamps: true });

NoteConjunctionSchema.methods.serialize = function() {
  return {
    id: this._id,
    conjunction: this.conjunction
  };
};

var NoteConjunction = mongoose.model('NoteConjunction', NoteConjunctionSchema);
export default NoteConjunction;

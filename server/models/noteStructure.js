import mongoose from 'mongoose';
import _ from 'lodash';

const enumStructureNumber = Object.freeze({
  SINGULAR: 'SINGULAR',
  PLURAL: 'PLURAL'
});

var NoteStructureSchema = mongoose.Schema({
  name: { type: String },
  structure: { type: String },
  numbers: [{
    type: String,
    enum: _.values(enumStructureNumber)
  }]
}, { timestamps: true });

NoteStructureSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    structure: this.structure,
    numbers: this.numbers
  };
};

var NoteStructure = mongoose.model('NoteStructure', NoteStructureSchema);
export default NoteStructure;
export { enumStructureNumber };

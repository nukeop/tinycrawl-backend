import mongoose from 'mongoose';

var MoveSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    index: true
  },
  prettyName: { type: String },
  description: { type: String },
  cooldown: { type: Number, default: 0 }
}, {timestamps: true});

MoveSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    prettyName: this.prettyName,
    description: this.description,
    cooldown: this.cooldown
  };
};

var Move = mongoose.model('Move', MoveSchema);
export default Move;

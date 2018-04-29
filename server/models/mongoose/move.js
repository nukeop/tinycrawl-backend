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
});

var Move = mongoose.model('Move', MoveSchema);
export default Move;

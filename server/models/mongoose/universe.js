import mongoose from 'mongoose';

var UniverseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

UniverseSchema.methods.serialize = function() {
  return {
    id: this._id,
    user: this.user
  };
};

var Universe = mongoose.model('Universe', UniverseSchema);
export default Universe;

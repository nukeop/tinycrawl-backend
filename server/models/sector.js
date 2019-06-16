import mongoose from 'mongoose';

var SectorSchema = mongoose.Schema({
  name: { type: String },
  rooms: [{
    type: mongoose.Schema.Types.ObjectId
  }],
  connections: [{
    type: mongoose.Schema.Types.ObjectId
  }]
}, { timestamps: true });

SectorSchema.methods.serialize = function () {
  return {
    id: this._id,
    ..._.pick(this, [
      'name',
      'rooms',
      'connections'
    ])
  };
};

var Sector = mongoose.model('Secotr', SectorSchema);
export default Sector;

import mongoose from 'mongoose';

var CurrencySchema = mongoose.Schema({
  name: { type: String },
  namePlural: { type: String },
  code: { type: String },
  color: { type: String }
}, { timestamps: true });

CurrencySchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    namePlural: this.namePlural,
    code: this.code,
    color: this.color
  };
};

var Currency = mongoose.model('Currency', CurrencySchema);
export default Currency;

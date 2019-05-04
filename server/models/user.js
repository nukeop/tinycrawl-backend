import _ from 'lodash';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { serializeAll } from '../helpers';

const enumUserRoles = Object.freeze({
  ROOT_ROLE: 'ROOT_ROLE',
  ADMIN_ROLE: 'ADMIN_ROLE',
  USER_ROLE: 'USER_ROLE'
});

var Inventory = mongoose.model('UserInventory'); //eslint-disable-line

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: [true, 'username must be unique'],
    required: [true, 'username is required'],
    match: [/^[a-zA-Z0-9_-]+$/, 'username contains invalid characters'],
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: [true, 'email must be unique'],
    required: [true, 'email is required'],
    match: [/\S+@\S+\.\S+/, 'email format is invalid'],
    index: true
  },
  displayName: {
    type: String,
    required: [true, 'display name is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  role: {
    type: String,
    enum: _.values(enumUserRoles),
    required: [true, 'role is required']
  },
  heroes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hero'
  }],
  inventory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInventory'
  }
}, {timestamps: true});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.setPassword = async function(password) {
  if (password.length < 3) {
    throw new Error('Password is too short');
  }
  let hash = await bcrypt.hash(password, 10);
  this.password = hash;
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username,
    displayName: this.displayName,
    email: this.email,
    role: this.role,
    heroes: this.heroes,
    inventory: this.inventory
  };
};

var User = mongoose.model('User', UserSchema);
export default User;
export { enumUserRoles };

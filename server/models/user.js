import _ from 'lodash';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const enumUserRoles = Object.freeze({
  ROOT_ROLE: 'ROOT_ROLE',
  ADMIN_ROLE: 'ADMIN_ROLE',
  USER_ROLE: 'USER_ROLE'
});

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
    required: [true, 'username is required'],
    match: [/\S+@\S+\.\S+/, 'email format is invalid'],
    index: true
  },
  displayName: {
    type: String,
    required: [true, 'display name is required'],
  },
  password: String,
  role: {
    type: String,
    enum: _.values(enumUserRoles),
    required: [true, 'role is required']
  },
  heroes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hero'
  }],
  universes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Universe'
  }]
}, {timestamps: true});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.setPassword = function(password) {
  bcrypt.hash(password, 10)
    .then(hash => {
      this.password = hash;
    });
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
    role: this.role
  };
};

var User = mongoose.model('User', UserSchema);
export default User;
export { enumUserRoles };

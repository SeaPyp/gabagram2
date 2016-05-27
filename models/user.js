var mongoose = require('mongoose'),
    Schema = mongoose.Schema
var bcrypt = require('bcrypt');

var userSchema = new Schema({
  name    : String,
  email   : String,
  password: String,
  gabs : [{ type: Schema.Types.ObjectId, ref: 'Gab' }],
  access_token: String,
  location: Number,

  fb : {
    id: String
  }
});

userSchema.index({location: '2dsphere'});

userSchema.methods.validatePassword = function(pwd) {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.encrypt = function(pwd) {
  return bcrypt.hashSync(pwd, 8);
};

var User = mongoose.model('User', userSchema);

module.exports = User;


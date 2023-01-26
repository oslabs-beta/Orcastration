const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

/*
Create Mongoose schema for 'User' model
Schema will have a email and password field that allows users to create an account
*/
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

/*
Encypt the password in userSchema with Bcrypt hashing prior to saving it to the database
*/
userSchema.pre('save', function (next) {
  const user = this;
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(user.password, salt))
    .then((hash) => {
      user.password = hash;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in hashing of user password:' + JSON.stringify(err),
        message: { err: 'An error occured in creating user password.' },
      });
    });
});

module.exports = mongoose.model('User', userSchema);

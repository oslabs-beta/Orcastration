const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI;
// 'mongodb+srv://max:123@users.jfqv078.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'OrcastrationDB',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

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
      return next('Error in hashing of user password:' + JSON.stringify(err));
    });
});

module.exports = mongoose.model('User', userSchema);

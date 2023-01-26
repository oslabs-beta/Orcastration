const mongoose = require('mongoose');
const User = require('../../server/models/userModel');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config({ path: './.env' });

const MONGO_URI = process.env.MONGO_URI;

beforeAll(async () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
  });
  mongoose.connection.on('error', () => {
    throw new Error('cannot connect to database');
  });
});

afterAll(async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
});

describe('Login?', () => {
  beforeEach(
    async () =>
      await new User({
        email: 'testpassword@test.com',
        password: 'match',
      }).save()
  );

  //find and delete the email created for verification to comply with 'unique' rule of MongoDB
  afterEach(
    async () => await User.findOneAndDelete({ email: 'testpassword@test.com' })
  );

  it('should throw an error if password is wrong', async () => {
    try {
      let userEmail = await User.find({ email: 'testpassword@test.com' });
      console.log('userEmail', userEmail);
      let wrongPassword = 'abc';
      //create userSchema.authenticate in userModels.js but it is not working
      const result = await bcrypt.compare(wrongPassword, userEmail[0].password);
      console.log('result', result);
      expect(result).toEqual(false);
    } catch (err) {
      throw new Error(err);
    }
  });
});

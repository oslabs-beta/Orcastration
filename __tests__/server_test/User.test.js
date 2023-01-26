const mongoose = require('mongoose');
const User = require('../../server/models/userModel');
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

describe('Signup', () => {
  beforeEach(
    async () =>
      await new User({
        email: 'createuser20@test.com',
        password: 'working',
      }).save()
  );

  //find and delete the email created for verification to comply with 'unique' rule of MongoDB
  afterEach(
    async () => await User.findOneAndDelete({ email: 'createuser20@test.com' })
  );

  it('should create a new user', async () => {
    try {
      User.find({ email: 'createuser20@test.com' }).then((user) =>
        expect(user[0].email).toBe('createuser20@test.com')
      );
    } catch (err) {
      throw new Error(err);
    }
  });
});

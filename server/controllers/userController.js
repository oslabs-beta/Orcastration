const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');

const userController = {};

//create a new user in the db
userController.createUser = async (req, res, next) => {

  try {
    if (res.locals.user) {
      return next({
        log: 'userController.createUser',
        status: 400,
        message: { err: 'Username Taken' },
      });
    }

    const salt = await bcrypt.genSalt(10);
    const { email, password } = req.body;
    const hashPW = await bcrypt.hash(email, salt);
    const user = await User.create({
      email,
      password: hashPW,
    });
    res.locals.newUser = user;
    return next();
  } catch (err) {
    return next(err);
  }
};























module.exports = userController;
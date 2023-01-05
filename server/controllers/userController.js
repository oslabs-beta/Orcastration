const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = (req, res, next) => {
  const { email, password } = req.body;

  User.create({ email, password })
    .then((userDoc) => {
      console.log(userDoc);
      res.locals.user = userDoc;
      return next();
    })
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return next({
          log: 'userController.createUser',
          status: 400,
          message: { err: 'The email has already been taken.' },
        });
      }
      console.log(err);
      next({
        log: `userController.createUser: ERROR: ${err}`,
        message: { err: 'An error occurred in creating new user.' },
      });
    });
};

userController.verifyUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((userDoc) =>
      bcrypt.compare(password, userDoc.password).then((match) => {
        if (match) {
          res.locals.user = userDoc;
          return next();
        } else {
          return next({
            log: 'userController.verifyUser: Error: email or password is incorrect.',
            status: 400,
            message: { err: 'email or password is incorrect.' },
          });
        }
      })
    )
    .catch((err) => {
      return next({
        log: `userController.verifyUser: Error: ${err}`,
        message: { err: 'An error occured in verifying user.' },
      });
    });
};

userController.getUser = (req, res, next) => {

  console.log('req.params:', req.params);
  const checkUser = req.body.email;
  console.log(checkUser);
  User.findOne({ email: checkUser })
    .then((user) => {
      if (user) {
        res.locals.user = user;
      }
      return next();
    })
    .catch((err) => {
      console.log('User is not found');
      return next({ message: 'An error occurred in getUser' });
    });
};

module.exports = userController;

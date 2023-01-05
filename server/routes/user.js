const express = require('express');
const router = express.Router();
// const cookieParser = require('cookie-parser');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

router.get('/:_email', userController.getUser, (req, res) => {
  return res.status(200).send(res.locals.checkUser);
});

router.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  return res.status(200).json(res.locals.user);
});

module.exports = router;

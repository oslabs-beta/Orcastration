const Session = require('../models/sessionModel')

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
    const { ssid } = req.cookies
    Session.find({cookieId: ssid})
      .then((data) => {
        if(data.length === 0){
            res.redirect('/signup')
        }
        if(data){
            return next()
        }
      })
      .catch((err) => {
        return next({err: 'Error in isLoggedIn'})
      })
}

sessionController.startSession = (req, res, next) => {
    const { _id } = res.locals.user
    Session.create({cookieId: _id})
    .then((data) => {
        if(data){
            return next()
        }
    })
    .catch((err) => {
        return next({err: 'Error in startSession'})
    })
}

module.exports = sessionController;
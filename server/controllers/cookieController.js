const cookieController = {};


cookieController.setSSIDCookie = (req, res, next) => {
    res.cookie('ssid', res.locals.user._id, { httpOnly: true })
    return next();
  }

module.exports = cookieController;
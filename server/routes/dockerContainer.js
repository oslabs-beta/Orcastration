const express = require('express');
const router = express.Router();
const dockerContainerController = require('../controllers/dockerContainerController');

router.get('/getStat', dockerContainerController.getStat, (req, res) => {
  return res.status(200).json(res.locals.dockerContData);
});

module.exports = router;

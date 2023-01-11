const express = require('express');
const router = express.Router();
const dockerContainerController = require('../controllers/dockerContainerController');

router.get(
  '/getContainers',
  dockerContainerController.getContainers,
  (req, res) => {
    return res.status(200).json(res.locals.dockerContData);
  }
);

router.get('/getStats', dockerContainerController.getStats, (req, res) => {
  return res.status(200).json(res.locals.dockerContainerStats);
});

router.get(
  '/getStatsByNode/:nodeID',
  dockerContainerController.getStatsByNode,
  (req, res) => {
    return res.status(200).json(res.locals.dockerContainerStats);
  }
);

module.exports = router;

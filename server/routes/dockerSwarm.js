const express = require('express');
const router = express.Router();
const dockerSwarmController = require('../controllers/dockerSwarmController');

router.get('/getNodes', dockerSwarmController.getNodes, (req, res) => {
  return res.status(200).json(res.locals.swarmNodeData);
});

router.get('/getTasks/:nodeID', dockerSwarmController.getTasks, (req, res) => {
  // need to send the tasks of specified node through res.locals
  return res.status(200).send(req.params);
});

module.exports = router;

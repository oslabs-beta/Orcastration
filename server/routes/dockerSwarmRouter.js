const express = require('express');
const router = express.Router();
const dockerSwarmController = require('../controllers/dockerSwarmController');

router.get('/getHealth/:containerID', dockerSwarmController.getHealth, (req, res) => {
  return res.status(200).json(res.locals.healthData)
})

// unused
// router.get('/getNodes', dockerSwarmController.getNodes, (req, res) => {
//   return res.status(200).json(res.locals.swarmNodeData);
// });

// unused
// router.get('/getTasks/:nodeID', dockerSwarmController.getTasks, (req, res) => {
//   // need to send the tasks of specified node through res.locals
//   return res.status(200).send(req.params);
// });

module.exports = router;

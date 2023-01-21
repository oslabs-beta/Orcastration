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

router.get(
  '/getTasks',
  dockerContainerController.getTasksByNode,
  (req, res) => {
    return res.status(200).json(res.locals.dockerContainerStats);
  }
);

// router.post(
//   '/getStats',
//   dockerContainerController.getContainerData,
//   (req, res) => {
//     return res.status(200).json(res.locals.dockerContainerStats);
//   }
// );

router.post(
  '/saveSwarmData',
  dockerContainerController.saveSwarmData,
  (req, res) => {
    return res.status(200).json(res.locals.containerSnapshotUUID);
  }
);

router.get(
  '/streamSwarmStats/:UUID',
  dockerContainerController.streamSwarmStats,
  // (req, res) => {
  //   return res.status(200).json(res.locals.dockerContainerStats);
  // }
);

// router.post(
//   '/getStreamData',
//   dockerContainerController.dockerContainerStreaData,
//   (req, res) => {
//     return res.status(200).json(res.locals);
//   }
// );

router.get(
  '/getStatsByNode/:nodeID',
  dockerContainerController.getStatsByNode,
  (req, res) => {
    return res.status(200).json(res.locals.dockerContainerStats);
  }
);

module.exports = router;

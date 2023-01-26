const { getContainerHealth } = require('../helperFunctions/dockerCLI.js');

dockerSwarmController = {};

/**
 * @description This middleware retrieves the health status and logs of a container
 * The information is used to allow users to monitor the health status and logs of a container with the click of a button
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next middleware function
 * @returns {function} next - Express next middleware function is returned after storing 'healthData' in res.locals
 */
dockerSwarmController.getHealth = (req, res, next) => {
  const containerID = req.params.containerID;
  getContainerHealth(containerID)
    .then((healthData) => {
      res.locals.healthData = healthData;
      console.log(res.locals.healthData);
      return next();
    })
    .catch((err) => {
      return next({
        log: `dockerSwarmController.getHealth: ERROR: ${err}`,
        message: {
          err: 'An error occurred in obtaining container health status.',
        },
      });
    });
};

module.exports = dockerSwarmController;

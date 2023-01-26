const ContainerSnapshot = require('../models/containerSnapshotModel');
const uuid = require('uuid');

/*
Import getNodeIDs, getRunningTaskIDs, and getTaskContainerIDs helper functions. See '../helperFunctions/dockerSwarmCLI.js' for more details.
*/
const {
  getNodeIDs,
  getRunningTaskIDs,
  getTaskContainerIDs,
  // getSwarmContainerInfo,
} = require('../helperFunctions/dockerSwarmCLI.js');

/*
Import getContainerStats helper function. See '../helperFunctions/dockerCLI.js' for more details.
*/
const { getContainerStats } = require('../helperFunctions/dockerCLI.js');

dockerContainerController = {};

/**
* @description This middleware retrieves an object containing all tasks and containers running strictly on the first node in the Docker Swarm cluster. 
  The information is used to populate the tasks and containers of the first node on the frontend upon landing/routing. 
  The information on the tasks and containers of other nodes in the Docker Swarm cluster will be retreived by clicking seprate node tabs. See 'getStatsByNode' middleware.
* @note This is done to modularize the code and reduce the amount of bandwidth and data being sent over the network through each HTTP request.
* @param {Object} req - Express request object
* @param {Object} res - Express response object
* @param {function} next - Express next middleware function
* @returns {function} next - Express next middleware function is returned after storing 'nodesData' in res.locals
* @throws {Object} err - An object containing the error message and log.
*/
dockerContainerController.getTasksByNode = (req, res, next) => {
  // Get the list of nodes in the Docker Swarm cluster
  getNodeIDs()
    .then((nodeIDList) => {
      // Extract the first node in the list of node ID's
      const firstNodeID = [nodeIDList[0]];
      return Promise.all(
        firstNodeID.map((nodeID) => {
          // Create an object for the current node
          const nodeData = { nodeID: nodeID, tasks: [] };
          // Get the running tasks for the current node
          return getRunningTaskIDs(nodeID).then((runningTaskList) => {
            // Iterate over the running tasks
            return Promise.all(
              runningTaskList.map((taskID) => {
                // Create an object for the current task
                const taskData = { taskID: taskID, containers: [] };
                // Get the container IDs for the current task
                return getTaskContainerIDs(taskID).then((containerIDList) => {
                  // Populate the containers array with the list of container ID's
                  taskData.containers = [...containerIDList];
                  return taskData;
                });
              })
            ).then((tasksData) => {
              // Populate the tasks array with the taskData objects containing the task ID and the array of container IDs associated with that task.
              nodeData.tasks = tasksData;
              return nodeData;
            });
          });
        })
      );
    })
    .then((nodesData) => {
      // Store the promise that resolves to an object containing the node ID and an array of task objects for the first node in the Docker Swarm cluster. Each task object contains the task ID and an array of container IDs associated with that task.
      res.locals.dockerContainerStats = nodesData;
      return next();
    })
    .catch((err) => {
      return next({
        log: `dockerContainerController.getTasksByNode: ERROR: ${err}`,
        message: {
          err: 'An error occurred in obtaining the tasks and containers of the first node in the Docker Swarm cluster.',
        },
      });
    });
};

/**
 * @description This middleware retrieves a list of container ID's from the request body, generates a new UUID, and sanitizes the container list.
   The sanitized container list and generated UUID are used as schema fields to create a new 'ContainerSnapshot' document in the database. 
   This middleware is used to store a snapshot of the container IDs in the database for later use in the 'streamSwarmStats' middleware.
 * @note By separating this functionality into a separate middleware, it allows for better control and management of the data flow, partial rendering,
         as well as reducing load on the server.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 * @return {function} next - Express next middleware function is returned after storing 'containerSnapshotUUID' in res.locals
 * @throws {Object} err - An object containing the error message and log.
 */
dockerContainerController.saveSwarmData = (req, res, next) => {
  const containerList = req.body.filter((id) => /^[A-Za-z0-9]*$/.test(id));
  const UUID = uuid.v4();
  ContainerSnapshot.create({ UUID, containerList })
    .then(() => {
      res.locals.containerSnapshotUUID = UUID;
      return next();
    })
    .catch((err) => {
      return next({
        log: `dockerContainterController.saveSwarmData: ERROR: ${err}`,
        message: {
          err: 'An error occurred in saving Docker Swarm cluster containers.',
        },
      });
    });
};

/**
* @description This middleware streams the statistics of all containers in a Docker Swarm cluster using Server-Sent Events (SSE) technology.
  It utilizes the UUID provided in the request params to query the 'ContainerSnapshot' model and retrieve the list of container IDs.
  The list of container IDs is concatenated and passed to the 'getContainerStats' function which retrieves the statistics of all containers in one exec call, reducing load and bandwidth.
  A streaming interval of 1500ms is used to make real-time update to the statistics
* @note This middleware is separated from the 'saveSwarmData' and 'getTasksByNode' middleware for better control and modularity of functionality, as well as for the purpose of reducing load on the server.
* @param {Object} req - Express request object
* @param {Object} res - Express response object
* @param {function} next - Express next middleware function
* @returns {void} 
 */
dockerContainerController.streamSwarmStats = (req, res, next) => {
  // Set response headers for SSE compatibility
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });
  const { UUID } = req.params;
  // Query the 'ContainerSnapshot' model in the database to find the list of containers associated to the unique UUID
  ContainerSnapshot.findOne({ UUID })
    .then((containerListDoc) => {
      if (containerListDoc === null) {
        return next({
          log: `dockerContainerController.streamSwarmStats: ContainerList with ${UUID} not found. ERROR: ${err}`,
          message: {
            err: 'An error occurred while attempting to find containers.',
          },
        });
      }
      // Concatenate the list of containers into one string to pass into 'getContainerStats' to retrieve the container stats in one exec call
      const concatenatedContainerIDs = containerListDoc.containerList.reduce(
        (acc, ID) => {
          return /^[A-Za-z0-9]*$/.test(ID) ? (acc += ID + ' ') : acc;
        },
        ''
      );
      return concatenatedContainerIDs;
    })
    .then((concatenatedContainerIDs) => {
      //  Set a streaming interval of 1500ms to retrieve real-time updates of the container statistics.
      const streamingInterval = setInterval(() => {
        getContainerStats(concatenatedContainerIDs)
          .then((containerStats) => {
            //  The returned statistics are stringified and written to the response object with a 'data:' prefix, adhering to SSE conventions.
            const stringifiedContainerStats = JSON.stringify(containerStats);
            res.write(`data: ${stringifiedContainerStats}\n\n`);
          })
          .catch((err) => {
            return next({
              log: `dockerContainerController.streamSwarmStats: Error occured in 'streamSwarmStats' streamingInterval. ERROR: ${err}`,
              message: {
                err: 'An error occurred while streaming Docker Swarm cluster container stats',
              },
            });
          });
      }, 1500);
      // Add 'close' event listener to clear the interval and end the response when the client closes the connection.
      res.on('close', () => {
        clearInterval(streamingInterval);
        res.end();
      });
    })
    .catch((err) => {
      return next({
        log: `dockerContainerController.streamSwarmStats: ERROR: ${err}`,
        message: {
          err: 'An error occurred while streaming Docker Swarm cluster container stats.',
        },
      });
    });
};

// Unused by FE
// dockerContainerController.getContainers = (req, res, next) => {
//   getSwarmContainerInfo().then((swarmContainerList) => {
//     console.log(swarmContainerList);
//     const containerStatus = swarmContainerList.map((container) => {
//       return {
//         createdAt: container.CreatedAt,
//         containerID: container.ID,
//         containerName: container.Names,
//         image: container.Image,
//         size: container.Size,
//         state: container.State,
//         containerStatus: container.Status,
//       };
//     });
//     res.locals.dockerContData = containerStatus;
//     return next().catch((err) => {
//       return next({
//         log: `dockerContainterController.getStatus: ERROR: ${err}`,
//         message: { err: "An error occurred in obtaining container status'." },
//       });
//     });
//   });
// };

module.exports = dockerContainerController;

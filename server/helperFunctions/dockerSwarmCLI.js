/*
Import execProm helper function. See '../helperFunctions/execProm.js' for more details.
*/
const { execProm } = require('../helperFunctions/execProm.js');

/*
Import parseRawData and parseRawDataIntoObject helper functions. See '../helperFunctions/parsers.js' for more details.
*/
const { parseRawData } = require('../helperFunctions/parsers.js');

/**
 * @description Retrieve Docker Swarm node ID's
 * @param {none} none - No input parameters
 * @returns {Promise<Array>} - A promise that resolves to an array containing the parsed node IDs
 */
const getNodeIDs = () => {
  return execProm('docker node ls --format "{{json .ID}}"').then(
    (rawNodeIDs) => {
      const parsedNodeIDs = parseRawData(rawNodeIDs);
      return parsedNodeIDs;
    }
  );
};

// getNodeIDs().then((nodeIDs) => {
//   console.log(nodeIDs);
// });

/**
 * @description Retrieve Docker Swarm 'running' task ID's of one node
 *
 * @param {string} nodeID - The node ID to retrieve the task IDs from
 * @returns {Promise<Array>} - A promise that resolves to an array containing the parsed running task IDs
 */
const getRunningTaskIDs = (nodeID) => {
  return execProm(
    `docker node ps ${nodeID} --filter desired-state=running --format "{{json .ID}}"`
  ).then((rawTaskIDs) => {
    const parsedRunningTaskIDs = parseRawData(rawTaskIDs);
    return parsedRunningTaskIDs;
  });
};

// getRunningTaskIDs('01hce8ymcxnkc10hhsgqusb0t').then((taskIDs) => {
//   console.log(taskIDs);
// });

/**
 * @description Retrieve Docker Swarm 'shutdown' task ID's
 *
 * @param {string} nodeID - The node ID to retrieve the task IDs from
 * @returns {Promise<Array>} - A promise that resolves to an array containing the parsed shutdown task IDs
 */
const getShutdownTaskIDs = (nodeID) => {
  return execProm(
    `docker node ps ${nodeID} --filter desired-state=shutdown --format "{{json .ID}}"`
  ).then((rawTaskIDs) => {
    const parsedShutdownTaskIDs = parseRawData(rawTaskIDs);
    return parsedShutdownTaskIDs;
  });
};

// getShutdownTaskIDs('01hce8ymcxnkc10hhsgqusb0t').then((taskIDs) => {
//   console.log(taskIDs);
// });

/**
 * @description Retrieve Docker Swarm container ID's filtered by task ID
 *
 * @param {string} taskID - The task ID to retrieve the container IDs from
 * @returns {Promise<Array>} - A promise that resolves to an array containing the parsed container IDs
 */
const getTaskContainerIDs = (taskID) => {
  return execProm(
    `docker inspect ${taskID} --format='{{json .Status.ContainerStatus.ContainerID}}'`
  ).then((rawContainerIDs) => {
    const parsedContainerIDs = parseRawData(rawContainerIDs);
    return parsedContainerIDs;
  });
};

// getTaskContainerIDs('d57ntl1o16jk').then((containerIDs) => {
//   console.log(containerIDs);
// });

/**
 * @description Retrieve info for all containers in Docker Swarm
 *
 * @param {none} none - No input parameters
 * @returns {Promise<Array>} - A promise that resolves to an array containing the parsed container info of all the containers in the swarm
 */
const getSwarmContainerInfo = () => {
  return execProm(
    // only list the containers in the swarm
    'docker ps --all --format "{{json .}}" --filter "label=com.docker.swarm.service.name"'
  ).then((rawSwarmContainerData) => {
    const parsedSwarmContainerData = parseRawData(rawSwarmContainerData);
    return parsedSwarmContainerData;
  });
};

// getSwarmContainerInfo().then((swarmContainerData) => {
//   console.log(swarmContainerData);
// });

module.exports = {
  getNodeIDs,
  getRunningTaskIDs,
  getShutdownTaskIDs,
  getTaskContainerIDs,
  getSwarmContainerInfo,
};

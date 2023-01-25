/*
Import execProm helper function. See '../helperFunctions/execProm.js' for more details.
*/
const { execProm } = require('../helperFunctions/execProm.js');

/*
Import parseRawData and parseRawDataIntoObject helper functions. See '../helperFunctions/parsers.js' for more details.
*/
const {
  parseRawData,
  parseRawDataIntoObject,
} = require('../helperFunctions/parsers.js');

/**
 * @description Retrieve non-streamed Docker container stats for one or more containers
 *
 * @param {string} containerIDs - The container IDs to retrieve stats for.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the parsed container stats.
 */
const getContainerStats = (containerIDs) => {
  return execProm(
    `docker stats ${containerIDs} --no-stream --format "{{json .}}"`
  ).then((rawContainerStats) => {
    const parsedContainerStats = parseRawDataIntoObject(rawContainerStats);
    return parsedContainerStats;
  });
};

// getContainerStats(
//   'f8340e7c21398988aa145cb3437b70fd895944e910b6b8ab624548e1afe09997' +
//     ' ' +
//     '20975d85d546b88ae9c1676268fef9aaefb2597120d18f9685865e8210e9781d'
// ).then((containerStats) => {
//   console.log(containerStats);
// });

/**
 * @description Retrieve Docker container info for one container
 *
 * @param {string} containerID - The container ID to retrieve info for.
 * @returns {Promise<Array>} - A promise that resolves to an array containing the parsed container info.
 */
const getContainerInfo = (containerID) => {
  return execProm(
    `docker ps --filter "id=${containerID}" --format "{{json .}}"`
  ).then((rawContainerData) => {
    const parsedContainerData = parseRawData(rawContainerData);
    return parsedContainerData;
  });
};

// getContainerInfo(
//   'f8340e7c21398988aa145cb3437b70fd895944e910b6b8ab624548e1afe09997'
// ).then((containerStats) => {
//   console.log(containerStats);
// });

/**
 * @description Retrieve Docker health status and logs for one container
 *
 * @param {string} containerID - The container ID to retrieve health status and logs for.
 * @returns {Promise<Array>} - A promise that resolves to an array containing the parsed container health status and logs.
 */
const getContainerHealth = (containerID) => {
  return execProm(
    `docker inspect ${containerID} --format="{{json .State.Health}}"`
  ).then((rawHealthData) => {
    const parsedRawHealthData = parseRawData(rawHealthData);
    return parsedRawHealthData;
  });
};

// getContainerHealth(
//   'ea07a765d32457ff5fc95b009562a3d939f59533dab6ee4b5b915d6febd66e32'
// ).then((containerHealth) => {
//   console.log(containerHealth);
// });

module.exports = {
  getContainerStats,
  getContainerInfo,
  getContainerHealth,
};

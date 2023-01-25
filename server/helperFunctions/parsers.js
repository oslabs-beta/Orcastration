/**
 * @description Parses the stdout from executing CLI through child_process and returns an array
 * 
 * @param {Object} rawData - The object containing stdout from executing the command
 * @returns {Array} - An array containing the parsed data from the stdout
 */
const parseRawData = (rawData) => {
  const stdout = rawData.stdout.trim().split('\n');
  const parsedData = stdout.map((rawData) => JSON.parse(rawData));
  return parsedData;
};

/**
 * @description Parses the stdout from executing CLI through child_process and returns an object 
 *
 * @param {Object} rawData - The object containing stdout from executing the command
 * @returns {Object} - An object containing container ID's as the key and the parsed data as the value
 */
const parseRawDataIntoObject = (rawData) => {
  const parsedDataObject = {};
  const stdout = rawData.stdout.trim().split('\n');
  stdout.forEach((rawData) => {
    const parsedData = JSON.parse(rawData);
    const containerID = parsedData.Container;
    parsedDataObject[containerID] = parsedData;
  });
  return parsedDataObject;
};

module.exports = { parseRawData, parseRawDataIntoObject };

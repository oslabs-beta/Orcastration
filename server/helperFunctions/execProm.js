/*
Import promisify function from 'util' library and exec function from 'child_process" library
*/
const { promisify } = require('util');
const { exec } = require('child_process');

/**
 * @description Convert the callback-based exec function to a promise-based function for cleaner syntax and better error handling
 * 
 * @param {string} command - The command to be executed
 * @returns {Promise<{stdout: string, stderr: string}>}  A promise that resolves to an object containing the stdout and stderr of the command execution
 */
const execProm = promisify(exec);

module.exports = {execProm}
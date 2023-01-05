const express = require('express');
const { promisify } = require('util');
const { exec } = require('child_process');
const { json } = require('express');

const execProm = promisify(exec);

dockerContainerController = {};

dockerContainerController.getStat = (req, res, next) => {
  execProm('docker ps --all --format "{{json .}}"')
    .then((rawData) => {
      const arr = rawData.stdout.split('\n');
      arr.pop();
      const parsedData = arr.map((container) => {
        const parsedContainer = JSON.parse(container);
        return {
          createdAt: parsedContainer.CreatedAt,
          containerId: parsedContainer.ID,
          containerName: parsedContainer.Names,
          image: parsedContainer.Image,
          size: parsedContainer.Size,
          state: parsedContainer.State,
          containerStatus: parsedContainer.Status,
        };
      });
      res.locals.dockerContData = parsedData;
      return next();
    })
    .catch((err) => {
      return next({
        log: `dockerContainterController.getStat: ERROR: ${err}`,
        message: { err: 'An error occurred in obtaining container stats.' },
      });
    });
};

module.exports = dockerContainerController;

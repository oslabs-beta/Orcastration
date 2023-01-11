const { promisify } = require('util');
const { exec } = require('child_process');

const execProm = promisify(exec);

const parseRawData = (rawData) => {
  const stdout = rawData.stdout.trim().split('\n');
  const parsedData = stdout.map((rawData) => JSON.parse(rawData));
  return parsedData;
};

dockerSwarmController = {};

dockerSwarmController.getHealth = (req, res, next) => {
  const containerID = req.params.containerID
  execProm(`docker inspect ${ containerID } --format="{{json .State.Health}}"`)
    .then((rawHealthData) => {
      const parsedRawHealthData = parseRawData(rawHealthData);
      return parsedRawHealthData;
    })
    .then((healthData) => {
      res.locals.healthData = healthData;
      return next();
    })
    .catch((err) => {
      return next({
        log: `dockerSwarmController.getHealth: ERROR: ${err}`,
        message: { err: "An error occurred in obtaining container health status."},
      })
    })
}

// get list of all nodes in swarm
dockerSwarmController.getNodes = (req, res, next) => {
  execProm('docker node ls --format "{{json .}}"')
    .then((rawNodeData) => {
      const parsedNodeData = parseRawData(rawNodeData);
      const nodeStatus = parsedNodeData.map((node) => {
        return {
          nodeID: node.ID,
          HostName: node.Hostname,
          Status: node.Status,
          Availability: node.Availability,
          ManagerStatus: node.ManagerStatus,
          TLSStatus: node.TLSStatus,
          EngineVersion: node.EngineVersion,
        };
      });
      res.locals.swarmNodeData = nodeStatus;
      return next();
    })
    .catch((err) => {
      return next({
        log: `dockerSwarmController.getNodes: ERROR: ${err}`,
        message: { err: "An error occurred in obtaining container status'." },
      });
    });
};

// get list of all tasks running on specified node, defaults to current node
// need to use params to pass the nodeID to get all the tasks a node has
dockerSwarmController.getTasks = (req, res, next) => {
  return next();
  // docker node ps --format "{{json .}}" 01hce8ymcxnkc10hhsgqusb0t
};

// set up controller for inspecting nodes? may or may not be needed. it will give info such as: see below
// NOTE: docker node inspect self will show detailed info of the current node
// you can specify other nodes using docker node -inspect <node-ID>
// OR multiple nodes with docker node -inspect <node1-ID> <node2-ID> <node3-ID>
// if we use this, we can consider using params for individual info?

         

// CREATE CONTROLLERS FOR SERVICES

// docker service ls - list all "RUNNING" services

// docker service ps <SERVICE-ID> - get a list of all nodes that are running the particular service.

// SIMILAR TO DOCKER NODE INSPECT, MAY OR MAY NOT WANT DOCKER SERVICE INSPECT
// docker service inspect <SERVICE-ID>
// below is the info we can get


/* possible stretch features - 

1) deply service from manager node
2) scale service
3) remove a service
4) apply rolling update to a service
5) drain a node

*/

module.exports = dockerSwarmController;

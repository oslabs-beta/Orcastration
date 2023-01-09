const { promisify } = require('util');
const { exec } = require('child_process');

const execProm = promisify(exec);

const parseRawData = (rawData) => {
  const stdout = rawData.stdout.trim().split('\n');
  const parsedData = stdout.map((rawData) => JSON.parse(rawData));
  return parsedData;
};

dockerContainerController = {};

dockerContainerController.getContainers = (req, res, next) => {
  execProm(
    // only list the containers in the swarm
    'docker ps --all --format "{{json .}}" --filter "label=com.docker.swarm.service.name"'
  )
    .then((rawContainerData) => {
      const parsedContainerData = parseRawData(rawContainerData);
      const containerStatus = parsedContainerData.map((container) => {
        return {
          createdAt: container.CreatedAt,
          containerID: container.ID,
          containerName: container.Names,
          image: container.Image,
          size: container.Size,
          state: container.State,
          containerStatus: container.Status,
        };
      });
      res.locals.dockerContData = containerStatus;
      return next();
    })
    .catch((err) => {
      return next({
        log: `dockerContainterController.getStatus: ERROR: ${err}`,
        message: { err: "An error occurred in obtaining container status'." },
      });
    });
};

dockerContainerController.getStats = (req, res, next) => {
  execProm('docker node ls --format "{{json .}}"')
    .then((rawNodeData) => {
      const parsedNodeData = parseRawData(rawNodeData);
      const nodeData = parsedNodeData.map((node) => {
        return {
          nodeID: node.ID,
        };
      });
      return nodeData;
    })
    .then((nodeData) => {
      const nodeID = nodeData[0].nodeID;
      const taskPromise = execProm(
        `docker node ps ${nodeID} --format "{{json .}}"`
      ).then((rawTaskData) => {
        const parsedTaskData = parseRawData(rawTaskData);
        const runningTasks = parsedTaskData.filter((task) => {
          return task.DesiredState === 'Running';
        });
        console.log('RUNNING TASKS', runningTasks);
        const taskData = [{ nodeID: `${nodeID}`, taskID: [] }];

        runningTasks.forEach((task) => {
          console.log('TASK', task);
          taskData[0].taskID.push(task.ID);
        });
        return taskData;
      });
      return taskPromise;
    })
    .then((taskData) => {
      taskData[0].containerID = [];
      const containerPromise = taskData[0].taskID.map((task) => {
        return execProm(
          `docker inspect ${task} --format='{{json .Status.ContainerStatus.ContainerID}}'`
        ).then((rawContainerData) => {
          const parsedContainerData = parseRawData(rawContainerData);
          taskData[0].containerID.push(parsedContainerData[0]);
          return taskData;
        });
      });
      return Promise.all(containerPromise);
    })
    .then((containerData) => {
      console.log('CONTAINERpromise', containerData[0]);
      containerData[0][0].containerMetrics = [];
      const mappedContainerData = containerData[0][0].containerID.map(
        (container) => {
          console.log('CONTAINER', container);
          return execProm(
            `docker stats ${container} --no-stream --format "{{json .}}"`
          ).then((rawContainerStats) => {
            const parsedContainerStats = parseRawData(rawContainerStats);
            console.log('PARSED CONTAINER STATS', parsedContainerStats);
            const metrics = {
              containerID: parsedContainerStats[0].ID,
              containerName: parsedContainerStats[0].Name,
              CPUPerc: parsedContainerStats[0].CPUPerc,
              memPerc: parsedContainerStats[0].MemPerc,
              memUsage: parsedContainerStats[0].MemUsage,
              netIO: parsedContainerStats[0].NetIO,
            };
            containerData[0][0].containerMetrics.push(metrics);
            console.log('CONTAINERDATA', containerData);
            return containerData;
          });
        }
      );
      return Promise.all(mappedContainerData);
    })
    .then((data) => {
      console.log('DATA[0]', data[0][0][0]);
      console.log('DATAAAAAAAAAAAAAAA', data);
      res.locals.dockerContainerStats = data[0][0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `dockerContainerController.getStats: ERROR: ${err}`,
        message: { err: "An error occurred in obtaining container stats'." },
      });
    });
};

// dockerContainerController.getStats = (req, res, next) => {
//   execProm(
//     'docker stats --no-stream 9929e422cbeb 050b0c808d1d --format "{{json .}}"'
//   ).then((rawContainerStatsData) => {
//     const parsedContainerStatsData = parseRawData(rawContainerStatsData);
//     console.log(parsedContainerStatsData);
//     const containerStatsData = parsedContainerStatsData.map((container) => {
//       return {
//         containerID: container.ID,
//         containerName: container.Name,
//         CPUPerc: container.CPUPerc,
//         memPerc: container.MemPerc,
//         memUsage: container.MemUsage,
//         netIO: container.NetIO,
//       };
//     });
//     res.locals.dockerContainerStats = containerStatsData;
//     return next();
//   });
// };
module.exports = dockerContainerController;

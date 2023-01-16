const { promisify } = require('util');
const { exec } = require('child_process');

const execProm = promisify(exec);

const parseRawData = (rawData) => {
  const stdout = rawData.stdout.trim().split('\n');
  const parsedData = stdout.map((rawData) => JSON.parse(rawData));
  return parsedData;
};

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

const getContainerIDs = (taskID) => {
  return execProm(
    `docker inspect ${taskID} --format='{{json .Status.ContainerStatus.ContainerID}}'`
  ).then((rawContainerIDs) => {
    const parsedContainerIDs = parseRawData(rawContainerIDs);
    return parsedContainerIDs;
  });
};

// getContainerIDs('d57ntl1o16jk').then((containerIDs) => {
//   console.log(containerIDs);
// });

const getContainerStats = (containerID) => {
  const idParams = containerID.reduce((acc, ID) => {
    return /^[A-Za-z0-9]*$/.test(ID) ? (acc += ID + ' ') : acc;
  }, '');
  console.log(idParams);
  return execProm(
    `docker stats ${idParams} --no-stream --format "{{json .}}"`
  ).then((rawContainerStats) => {
    const parsedContainerStats = parseRawData(rawContainerStats);
    return parsedContainerStats;
  });
};

// getContainerStats(
//   'ee004d55c7aaa66b6e08b9fe42b40c0e5b81f1d5c350aa7531a9709d87517017',
//   'c0e2047791f5a1456b45238de0063b8d5f4c1a1963b35372b1042a1322eaa00b'
// ).then((containerStats) => {
//   console.log(containerStats);
// });

const getContainerInfo = (containerID) => {
  return execProm(
    `docker ps --filter "id=${containerID}" --format "{{json .}}"`
  ).then((rawContainerData) => {
    const parsedContainerData = parseRawData(rawContainerData);
    return parsedContainerData;
  });
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

/*
getStats() => 

{
  containerIDA : taskIDA,
  containerIDB : taskIDB,
  containerIDC : taskIDA
}

if (!object[containerID] => getStats()); <<<<



while iterating, also build an object like this : 


const containerIdObj = {
  containerID: taskID1,
  containerID2: taskID2,
  containerID3: taskID1
}

streamInfo(containerIDs) {
  setInterval(
    dockerstats().filter(
      containerID => containerIdObj[containerID] <<<<
      containerID => taskData.containers.includes(containerID) <<<<
    )
  , interval)
}




*/
dockerContainerController.getTasksByNode = (req, res, next) => {
  getNodeIDs()
    .then((nodeIDList) => {
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
                return getContainerIDs(taskID).then((containerIDList) => {
                  // console.log(containerIDList);
                  taskData.containers = [...containerIDList];
                  return taskData;
                });
              })
            ).then((tasksData) => {
              // console.log('tasksData', tasksData);
              nodeData.tasks = tasksData;
              return nodeData;
            });
          });
        })
      );
    })
    .then((nodesData) => {
      res.locals.dockerContainerStats = nodesData;
      return next();
    })
    .catch((err) => {
      return next({
        log: `dockerContainerController.getStats: ERROR: ${err}`,
        message: { err: "An error occurred in obtaining container stats'." },
      });
    });
};
// send back a UUID and save task + container IDs in DB
dockerContainerController.getContainerData = (req, res, next) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  console.log('REQBODY', req.body);
  // setInterval(() => {}, 1500);
  const containerList = Object.keys(req.body);
  getContainerStats(containerList)
    .then((containerStats) => {
      console.log(containerStats);
      const containerData = {};
      containerStats.forEach((container) => {
        const containerID = container.Container;
        const taskID = req.body[containerID];
        !containerData[taskID]
          ? (containerData[taskID] = [container])
          : containerData[taskID].push(container);
      });
      res.locals.dockerContainerStats = containerData;
      return next();
    })
    .catch((err) => {
      return next({
        log: `dockerContainerController.getContainerData: ERROR: ${err}`,
        message: { err: "An error occurred in obtaining container stats'." },
      });
    });
};

// dockerContainerController.getStats = (req, res, next) => {
//   getNodeIDs()
//     .then((nodeIDList) => {
//       const firstNodeID = [nodeIDList[0]];
//       return Promise.all(
//         firstNodeID.map((nodeID) => {
//           // Create an object for the current node
//           const nodeData = { nodeID: nodeID, tasks: [] };

//           // Get the running tasks for the current node
//           return getRunningTaskIDs(nodeID).then((runningTaskList) => {
//             // Iterate over the running tasks
//             return Promise.all(
//               runningTaskList.map((taskID) => {
//                 // Create an object for the current task
//                 const taskData = { taskID: taskID, containers: [] };

//                 // Get the container IDs for the current task
//                 return getContainerIDs(taskID).then((containerIDList) => {
//                   // Iterate over the container IDs
//                   return Promise.all(
//                     containerIDList.map((containerID) => {
//                       // Get the stats for the current container
//                       return getContainerStats(containerID).then(
//                         (containerStat) => {
//                           // Create an object for the current container
//                           const containerData = {
//                             containerID: containerStat[0].ID,
//                             containerName: containerStat[0].Name,
//                             CPUPerc: containerStat[0].CPUPerc,
//                             memPerc: containerStat[0].MemPerc,
//                             memUsage: containerStat[0].MemUsage,
//                             netIO: containerStat[0].NetIO,
//                           };
//                           // Add the container data to the task's containers array
//                           taskData.containers.push(containerData);
//                           return taskData;
//                         }
//                       );
//                     })
//                   ).then((tasksData) => {
//                     return tasksData[0];
//                   });
//                 });
//               })
//             ).then((tasksData) => {
//               nodeData.tasks = tasksData;
//               return nodeData;
//             });
//           });
//         })
//       );
//     })
//     .then((nodesData) => {
//       res.locals.dockerContainerStats = nodesData;
//       return next();
//     })
//     .catch((err) => {
//       return next({
//         log: `dockerContainerController.getStats: ERROR: ${err}`,
//         message: { err: "An error occurred in obtaining container stats'." },
//       });
//     });
// };

dockerContainerController.getStatsByNode = (req, res, next) => {
  let nodeID = req.params.nodeID;
  return Promise.all(
    [nodeID].map((nodeID) => {
      const nodeData = { nodeID: nodeID, tasks: [] };

      return getRunningTaskIDs(nodeID).then((runningTaskList) => {
        return Promise.all(
          runningTaskList.map((taskID) => {
            const taskData = { taskID: taskID, containers: [] };

            return getContainerIDs(taskID).then((containerIDList) => {
              return Promise.all(
                containerIDList.map((containerID) => {
                  return getContainerStats(containerID).then(
                    (containerStat) => {
                      const containerData = {
                        containerID: containerStat[0].ID,
                        containerName: containerStat[0].Name,
                        CPUPerc: containerStat[0].CPUPerc,
                        memPerc: containerStat[0].MemPerc,
                        memUsage: containerStat[0].MemUsage,
                        netIO: containerStat[0].NetIO,
                      };

                      taskData.containers.push(containerData);
                      return taskData;
                    }
                  );
                })
              ).then((tasksData) => {
                return tasksData[0];
              });
            });
          })
        ).then((tasksData) => {
          nodeData.tasks = tasksData;

          return nodeData;
        });
      });
    })
  )
    .then((nodesData) => {
      res.locals.dockerContainerStats = nodesData;
      return next();
    })
    .catch((err) => {
      return next({
        log: `dockerContainerController.getStatsByNode: ERROR: ${err}`,
        message: {
          err: "An error occurred in obtaining container stats by node'.",
        },
      });
    });
};

module.exports = dockerContainerController;

const { promisify } = require('util');
const { exec } = require('child_process');

const execProm = promisify(exec);

const parseRawData = (rawData) => {
  const stdout = rawData.stdout.trim().split('\n');
  const parsedData = stdout.map((rawData) => JSON.parse(rawData));
  return parsedData;
};

dockerSwarmController = {};

// get list of all nodes in swarm
dockerSwarmController.getNodes = (req, res, next) => {
  execProm('docker node ls --format "{{json .}}"')
    .then((rawNodeData) => {
      const parsedNodeData = parseRawData(rawNodeData);
      console.log(parsedNodeData);
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
const arr = [
  {
    ID: '01hce8ymcxnkc10hhsgqusb0t',
    Version: {
      Index: 9,
    },
    CreatedAt: '2023-01-08T21:34:30.290677061Z',
    UpdatedAt: '2023-01-08T21:34:30.815292517Z',
    Spec: {
      Labels: {},
      Role: 'manager',
      Availability: 'active',
    },
    Description: {
      Hostname: 'docker-desktop',
      Platform: {
        Architecture: 'x86_64',
        OS: 'linux',
      },
      Resources: {
        NanoCPUs: 2000000000,
        MemoryBytes: 5173370880,
      },
      Engine: {
        EngineVersion: '20.10.21',
        Plugins: [
          {
            Type: 'Log',
            Name: 'awslogs',
          },
          {
            Type: 'Log',
            Name: 'fluentd',
          },
          {
            Type: 'Log',
            Name: 'gcplogs',
          },
          {
            Type: 'Log',
            Name: 'gelf',
          },
          {
            Type: 'Log',
            Name: 'journald',
          },
          {
            Type: 'Log',
            Name: 'json-file',
          },
          {
            Type: 'Log',
            Name: 'local',
          },
          {
            Type: 'Log',
            Name: 'logentries',
          },
          {
            Type: 'Log',
            Name: 'splunk',
          },
          {
            Type: 'Log',
            Name: 'syslog',
          },
          {
            Type: 'Network',
            Name: 'bridge',
          },
          {
            Type: 'Network',
            Name: 'host',
          },
          {
            Type: 'Network',
            Name: 'ipvlan',
          },
          {
            Type: 'Network',
            Name: 'macvlan',
          },
          {
            Type: 'Network',
            Name: 'null',
          },
          {
            Type: 'Network',
            Name: 'overlay',
          },
          {
            Type: 'Volume',
            Name: 'local',
          },
        ],
      },
      TLSInfo: {
        TrustRoot:
          '-----BEGIN CERTIFICATE-----\nMIIBazCCARCgAwIBAgIUVS92o88Sj8iRN6hpItuendIWf1AwCgYIKoZIzj0EAwIw\nEzERMA8GA1UEAxMIc3dhcm0tY2EwHhcNMjMwMTA4MjEzMDAwWhcNNDMwMTAzMjEz\nMDAwWjATMREwDwYDVQQDEwhzd2FybS1jYTBZMBMGByqGSM49AgEGCCqGSM49AwEH\nA0IABOSs7nmINkb2jogrMmnJtSgsjbgeqaqA7Ts8rUPgj9mj+OCVgEremD1MfsQ8\n3tdggDFUsZs62EHXpmx62UPvEQ6jQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNVHRMB\nAf8EBTADAQH/MB0GA1UdDgQWBBR7e+gnmgxs+PoGAwSOMoCq6e7VDTAKBggqhkjO\nPQQDAgNJADBGAiEA6ohXnCjDysNC2NdILbVMFEgSj0EzXuBeDZn765yB6MUCIQDh\nLnJhBrkcxkaLuBZ+k+HCLkWk6zMsNul2858tPH6FVA==\n-----END CERTIFICATE-----\n',
        CertIssuerSubject: 'MBMxETAPBgNVBAMTCHN3YXJtLWNh',
        CertIssuerPublicKey:
          'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE5KzueYg2RvaOiCsyacm1KCyNuB6pqoDtOzytQ+CP2aP44JWASt6YPUx+xDze12CAMVSxmzrYQdembHrZQ+8RDg==',
      },
    },
    Status: {
      State: 'ready',
      Addr: '192.168.65.3',
    },
    ManagerStatus: {
      Leader: true,
      Reachability: 'reachable',
      Addr: '192.168.65.3:2377',
    },
  },
];

// CREATE CONTROLLERS FOR SERVICES

// docker service ls - list all "RUNNING" services

// docker service ps <SERVICE-ID> - get a list of all nodes that are running the particular service.

// SIMILAR TO DOCKER NODE INSPECT, MAY OR MAY NOT WANT DOCKER SERVICE INSPECT
// docker service inspect <SERVICE-ID>
// below is the info we can get

const arr2 = [
  {
    ID: 'l5nebe5jyyx1qbfsoopi3zztv',
    Version: {
      Index: 30,
    },
    CreatedAt: '2023-01-08T23:45:47.728058055Z',
    UpdatedAt: '2023-01-09T00:01:12.206283301Z',
    Spec: {
      Name: 'helloworld',
      Labels: {},
      TaskTemplate: {
        ContainerSpec: {
          Image:
            'alpine:latest@sha256:8914eb54f968791faf6a8638949e480fef81e697984fba772b3976835194c6d4',
          Args: ['ping', 'docker.com'],
          Init: false,
          StopGracePeriod: 10000000000,
          DNSConfig: {},
          Isolation: 'default',
        },
        Resources: {
          Limits: {},
          Reservations: {},
        },
        RestartPolicy: {
          Condition: 'any',
          Delay: 5000000000,
          MaxAttempts: 0,
        },
        Placement: {
          Platforms: [
            {
              Architecture: 'amd64',
              OS: 'linux',
            },
            {
              OS: 'linux',
            },
            {
              OS: 'linux',
            },
            {
              Architecture: 'arm64',
              OS: 'linux',
            },
            {
              Architecture: '386',
              OS: 'linux',
            },
            {
              Architecture: 'ppc64le',
              OS: 'linux',
            },
            {
              Architecture: 's390x',
              OS: 'linux',
            },
          ],
        },
        ForceUpdate: 0,
        Runtime: 'container',
      },
      Mode: {
        Replicated: {
          Replicas: 5,
        },
      },
      UpdateConfig: {
        Parallelism: 1,
        FailureAction: 'pause',
        Monitor: 5000000000,
        MaxFailureRatio: 0,
        Order: 'stop-first',
      },
      RollbackConfig: {
        Parallelism: 1,
        FailureAction: 'pause',
        Monitor: 5000000000,
        MaxFailureRatio: 0,
        Order: 'stop-first',
      },
      EndpointSpec: {
        Mode: 'vip',
      },
    },
    PreviousSpec: {
      Name: 'helloworld',
      Labels: {},
      TaskTemplate: {
        ContainerSpec: {
          Image:
            'alpine:latest@sha256:8914eb54f968791faf6a8638949e480fef81e697984fba772b3976835194c6d4',
          Args: ['ping', 'docker.com'],
          Init: false,
          DNSConfig: {},
          Isolation: 'default',
        },
        Resources: {
          Limits: {},
          Reservations: {},
        },
        Placement: {
          Platforms: [
            {
              Architecture: 'amd64',
              OS: 'linux',
            },
            {
              OS: 'linux',
            },
            {
              OS: 'linux',
            },
            {
              Architecture: 'arm64',
              OS: 'linux',
            },
            {
              Architecture: '386',
              OS: 'linux',
            },
            {
              Architecture: 'ppc64le',
              OS: 'linux',
            },
            {
              Architecture: 's390x',
              OS: 'linux',
            },
          ],
        },
        ForceUpdate: 0,
        Runtime: 'container',
      },
      Mode: {
        Replicated: {
          Replicas: 1,
        },
      },
      EndpointSpec: {
        Mode: 'vip',
      },
    },
    Endpoint: {
      Spec: {},
    },
  },
];

/* possible stretch features - 

1) deply service from manager node
2) scale service
3) remove a service
4) apply rolling update to a service
5) drain a node

*/

module.exports = dockerSwarmController;

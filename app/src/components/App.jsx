import React, { useEffect, useState } from 'react';
import Tabs from './tabComponent/Tabs';
import Navigation from './Navigation';
import ManagerMetricsContainer from './Managers/ManagerMetricsContainer';
// import Data from '../TEST-DATA/Data';
// import PieChart from '../components/PieChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

//pull node name from incoming data

// console.log(nodeName);
// create an array called 'data' that will hold an array of objects, objects will
// be the data object that our Pie component from ChartJS is expecting

// let nodeName = Data[0].nodeID;
// console.log(nodeName)
// const getData = async () => {
// }
// fetch('/dockerCont/getStats')
//   .then((rawData) => {
//     console.log('raw data:', rawData);
//     return rawData.json();
//   })
//   .then((refinedData) => {
//     console.log('data:', refinedData);
//     return (Data = refinedData);
//   });

// const dataTasks = Data[0].tasks;
// // console.log(dataTasks);
// for (let i = 0; i < dataTasks.length; i++) {
//   // console.log(parseFloat(dataTasks[i].containers[0].CPUPerc));
//   totalPercentageCPU += parseFloat(dataTasks[i].containers[0].CPUPerc);
//   // console.log(dataTasks[i].containers[0].containerName);
//   if (dataTasks[i].containers.length > 1) {
//     //!!!LOGIC NOT COMPLETE!!!!COME BACK AND MAKE THIS SUCK LESS!!!!!
//   } else {
//     cpuData.push({
//       labels: [dataTasks[i].containers[0].containerName, 'max allowed cpu'],
//       datasets: [
//         {
//           label: 'cpu test',
//           data: [
//             parseFloat(dataTasks[0].containers[0].CPUPerc),
//             100 - parseFloat(dataTasks[0].containers[0].CPUPerc),
//           ],
//           backgroundColor: [
//             'rgba(75,192,192,1)',
//             '#ecf0f1',
//             '#50AF95',
//             '#f3ba2f',
//             '#2a71d0',
//           ],
//           borderColor: 'black',
//           borderWidth: 3,
//         },
//       ],
//     });
//     memData.push({
//       labels: [dataTasks[i].containers[0].containerName, 'max allowed memory'],
//       datasets: [
//         {
//           label: 'memory test',
//           data: [
//             parseFloat(dataTasks[0].containers[0].memPerc),
//             100 - parseFloat(dataTasks[0].containers[0].memPerc),
//           ],
//           backgroundColor: [
//             'rgba(75,192,192,1)',
//             '#ecf0f1',
//             '#50AF95',
//             '#f3ba2f',
//             '#2a71d0',
//           ],
//           borderColor: 'black',
//           borderWidth: 3,
//         },
//       ],
//     });
//   }
// }

// console.log(cpuData);
// console.log(memData[0].datasets[0].label);
// console.log(memData[0].datasets[0]);
// console.log(totalPercentageCPU);
// console.log(dataTasks[0].containers[0].CPUPerc);
// console.log(parseFloat(dataTasks[0].containers[0].CPUPerc));

const App = (props) => {
  // console.log('running app');
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('tab1');
  const [currentNode, setCurrentNode] = useState('');
  // //set our previously created array of data objects as our chartData state
  const [chartData, setChartData] = useState([]);
  const [totalCPU, setPercentageCPU] = useState(0);
  const [memoryData, setMemoryData] = useState([]);
  // // console.log(chartData);
  const updateNode = (node) => {
    setCurrentNode(node);
  };
  useEffect(() => {
    console.log('running use effect');
    const fetchData = async () => {
      try {
        let rawData = await fetch('/dockerCont/getStats');
        console.log('raw data:', rawData);
        let parsedData = await rawData.json();
        console.log('parsed data:', parsedData);
        setData(parsedData);
        setCurrentNode(parsedData[0].nodeID);
        console.log('DATTA', parsedData);

        const cpuData = [];
        const memData = [];
        let totalPercentageCPU = 0;
        const dataTasks = parsedData[0].tasks;
        console.log('dataTasks!!!!', dataTasks);
        setCurrentNode(parsedData[0].nodeID);
        // console.log(dataTasks);
        for (let i = 0; i < dataTasks.length; i++) {
          // console.log(parseFloat(dataTasks[i].containers[0].CPUPerc));
          totalPercentageCPU += parseFloat(dataTasks[i].containers[0].CPUPerc);
          console.log('totalPercentageCPU!!!', totalPercentageCPU)
          // console.log(dataTasks[i].containers[0].containerName);
          if (dataTasks[i].containers.length > 1) {
            //!!!LOGIC NOT COMPLETE!!!!COME BACK AND MAKE THIS SUCK LESS!!!!!
          } else {
            cpuData.push({
              labels: [
                dataTasks[i].containers[0].containerName,
                'max allowed cpu',
              ],
              datasets: [
                {
                  label: 'cpu test',
                  data: [
                    parseFloat(dataTasks[i].containers[0].CPUPerc),
                    100 - parseFloat(dataTasks[i].containers[0].CPUPerc),
                  ],
                  backgroundColor: [
                    'rgba(75,192,192,1)',
                    '#ecf0f1',
                    '#50AF95',
                    '#f3ba2f',
                    '#2a71d0',
                  ],
                  borderColor: 'black',
                  borderWidth: 3,
                },
              ],
            });
            memData.push({
              labels: [
                dataTasks[i].containers[0].containerName,
                'max allowed memory',
              ],
              datasets: [
                {
                  label: 'memory test',
                  data: [
                    parseFloat(dataTasks[i].containers[0].memPerc),
                    100 - parseFloat(dataTasks[i].containers[0].memPerc),
                  ],
                  backgroundColor: [
                    'rgba(75,192,192,1)',
                    '#ecf0f1',
                    '#50AF95',
                    '#f3ba2f',
                    '#2a71d0',
                  ],
                  borderColor: 'black',
                  borderWidth: 3,
                },
              ],
            });
          }
        }
        setChartData(cpuData);
        setMemoryData(memData);
      } catch (err) {
        console.log(err);
        console.log('theres been an error while fetching data');
      }
    };
    fetchData();
  }, []);
  console.log('new state of Data', data);
  return (
    <div className='navigation' id='background'>
      <Navigation />
      <div className='managerAndTabs mx-6'>
        <ManagerMetricsContainer
          // activeTab={activeTab}
          currentNode={currentNode}
          totalCPU={totalCPU}
        />
        <Tabs
          activeTab={activeTab}
          // setActiveTab={setActiveTab}
          currentNode={currentNode}
          // setCurrentNode={setCurrentNode}
          chartData={chartData}
          totalPercentageCPU={totalCPU}
          memoryData={memoryData}
        />
      </div>
    </div>
  );
};

export default App;

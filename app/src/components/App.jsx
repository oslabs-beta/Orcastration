import React, { useState } from 'react';
import Tabs from './tabComponent/Tabs';
import Navigation from './Navigation';
import ManagerMetricsContainer from './Managers/ManagerMetricsContainer';
import Data from '../TEST-DATA/Data';
// import PieChart from '../components/PieChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const cpuData = [];
const memData = [];
let totalPercentageCPU = 0;
//pull node name from incoming data
let nodeName = Data[0].nodeID;
// console.log(nodeName);
// create an array called 'data' that will hold an array of objects, objects will
// be the data object that our Pie component from ChartJS is expecting
const dataTasks = Data[0].tasks;
// console.log(dataTasks);
for (let i = 0; i < dataTasks.length; i++) {
  // console.log(parseFloat(dataTasks[i].containers[0].CPUPerc));
  totalPercentageCPU += parseFloat(dataTasks[i].containers[0].CPUPerc);
  // console.log(dataTasks[i].containers[0].containerName);
  if (dataTasks[i].containers.length > 1) {
    //!!!LOGIC NOT COMPLETE!!!!COME BACK AND MAKE THIS SUCK LESS!!!!!
  } else {
    cpuData.push({
      labels: [dataTasks[i].containers[0].containerName, 'max allowed cpu'],
      datasets: [
        {
          label: 'cpu test',
          data: [
            parseFloat(dataTasks[0].containers[0].CPUPerc),
            100 - parseFloat(dataTasks[0].containers[0].CPUPerc),
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
      labels: [dataTasks[i].containers[0].containerName, 'max allowed memory'],
      datasets: [
        {
          label: 'memory test',
          data: [
            parseFloat(dataTasks[0].containers[0].memPerc),
            100 - parseFloat(dataTasks[0].containers[0].memPerc),
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

// console.log(cpuData);
// console.log(memData[0].datasets[0].label);
// console.log(memData[0].datasets[0]);
// console.log(totalPercentageCPU);
// console.log(dataTasks[0].containers[0].CPUPerc);
// console.log(parseFloat(dataTasks[0].containers[0].CPUPerc));

const App = (props) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [currentNode, setCurrentNode] = useState(nodeName);
  //set our previously created array of data objects as our chartData state
  const [chartData, setChartData] = useState(cpuData);
  const [totalCPU, setPercentageCPU] = useState(totalPercentageCPU);
  const [memoryData, setMemoryData] = useState(memData);
  const updateNode = (node) => {
    setCurrentNode(manager);
  };
  // console.log(memoryData);
  return (
    <div className='navigation' id='background'>
      <Navigation />
      <div className='managerAndTabs mx-6'>
        <ManagerMetricsContainer
          activeTab={activeTab}
          currentNode={currentNode}
          totalCPU={totalCPU}
        />
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentNode={currentNode}
          setCurrentNode={setCurrentNode}
          chartData={chartData}
          totalPercentageCPU={totalPercentageCPU}
          memoryData={memoryData}
        />
      </div>
    </div>
  );
};

export default App;

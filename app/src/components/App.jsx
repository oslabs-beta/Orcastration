import React, { useState } from 'react';
import Tabs from './tabComponent/Tabs';
import Navigation from './Navigation';
import ManagerMetricsContainer from './Managers/ManagerMetricsContainer';
import Data from '../TEST-DATA/Data';
// import PieChart from '../components/PieChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = [];
let totalPercentageCPU = 0;
//create an array called 'data' that will hold an array of objects, objects will
//be the data object that our Pie component from ChartJS is expecting
for (let i = 0; i < Data.length; i++) {
  totalPercentageCPU += Data[i].cpu;
  data.push({
    labels: [Data[i].name, 'available cpu'],
    datasets: [
      {
        label: 'test',
        data: [Data[i].cpu, 100 - Data[i].cpu],
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

// console.log(data);
// console.log(totalPercentageCPU);

const App = (props) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [currentManager, setCurrentManager] = useState('Manager 1');
  //set our previously created array of data objects as our chartData state
  const [chartData, setChartData] = useState(data);
  const [totalCPU, setPercentageCPU] = useState(totalPercentageCPU);

  console.log(chartData);
  const updateManager = (manager) => {
    setCurrentManager(manager);
  };

  return (
    <div className='navigation h-full' id='background'>
      <Navigation />
      <div className='managerAndTabs mx-6 overflow-y-visible'>
        <ManagerMetricsContainer
          activeTab={activeTab}
          currentManager={currentManager}
          managerActive={true}
          totalCPU={totalCPU}
        />
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentManager={currentManager}
          updateManager={updateManager}
          chartData={chartData}
          totalPercentageCPU={totalPercentageCPU}
        />
      </div>
      <div className='text-slate-500'>this will be the footer (R)</div>
    </div>
  );
};

export default App;

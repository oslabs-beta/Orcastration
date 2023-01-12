import React, { useEffect, useState } from 'react';
import Tabs from './tabComponent/Tabs';
import Navigation from './Navigation';
import ManagerMetricsContainer from './Managers/ManagerMetricsContainer';
// import Data from '../TEST-DATA/Data';
// import PieChart from '../components/PieChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const App = (props) => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('tab1');
  const [currentNode, setCurrentNode] = useState('');
  const [nodeTotal, setNodeTotal] = useState(0)

  const updateNode = (node) => {
    setCurrentNode(node);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let rawData = await fetch('/dockerCont/getStats');
        let parsedData = await rawData.json();
        setData(parsedData);
        setCurrentNode(parsedData[0].nodeID);
        let totalPercentageCPU = 0;
        setCurrentNode(parsedData[0].nodeID);
      } catch (err) {
        console.log('Error in App.jsx useEffect', err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='navigation' id='background'>
      <Navigation />
      <div className='managerAndTabs mx-6'>
        <ManagerMetricsContainer
          activeTab={activeTab}
          currentNode={currentNode}   
        />
        <Tabs
          allTasks={data}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentNode={currentNode}
        />
      </div>
    </div>
  );
};

export default App;

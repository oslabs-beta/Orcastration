import React from 'react';
import Metrics from './Metrics.js';

const ManagerMetricsContainer = ({ activeTab, currentManager }) => {
  // console.log(currentManager);
  return (
    <div className='managerMetricsContainer bg-nightblue-800/60 shadow-xl h-4'>
      <h1 className='mainFontEl'>{currentManager}</h1>
      <Metrics />
    </div>
  );
};

export default ManagerMetricsContainer;

import React from 'react';
import Metrics from './Metrics.js';

const ManagerMetricsContainer = ({ activeTab, currentManager }) => {
  // console.log(currentManager);
  return (
    <div className='managerMetricsContainer'>
      <h1 className='mainFontEl'>{currentManager}</h1>
      <Metrics />
    </div>
  );
};

export default ManagerMetricsContainer;

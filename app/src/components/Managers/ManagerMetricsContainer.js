import React from 'react';
import Metrics from './metrics.js';

const ManagerMetricsContainer = ({ currentManager, totalCPU }) => {
  // console.log(currentManager);
  return (
    <div className='managerMetricsContainer bg-nightblue-800/60 shadow-xl h-4'>
      <h1 className='mainFontEl'>{currentManager}</h1>
      <Metrics totalCPU={totalCPU} currentManager={currentManager} />
    </div>
  );
};

export default ManagerMetricsContainer;

import React from 'react';
import Metrics from './metrics.js';

const ManagerMetricsContainer = ({ activeTab, currentManager }) => {
  // console.log(currentManager);
  return (
    <div className='managerMetricsContainer rounded-md bg-nightblue-800/60 shadow-xl h-full text-slate-200 m-0 w-full outline-nightblue-700'>
      <h1 className='mainFontEl'>{currentManager}</h1>
      <Metrics />
    </div>
  );
};

export default ManagerMetricsContainer;

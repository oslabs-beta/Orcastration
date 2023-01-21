import React from 'react';
import Metrics from './Metrics.js';
import LoadingInformationContainer from '../LoadingInformation/LoadingInformationContainer';

const ManagerMetricsContainer = ({
  currentNode,
  totalCPU,
  currentStep,
  setCurrentStep,
}) => {
  // console.log(currentManager);
  return (
    <div
      className='managerMetricsContainer rounded-md bg-nightblue-800/60
      shadow-xl h-full text-slate-200 m-0 w-full outline-nightblue-700'
    >
      <h1 className='mainFontEl'>NodeID: {currentNode}</h1>
      <Metrics totalCPU={totalCPU} currentNode={currentNode} />
      <LoadingInformationContainer
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
};

export default ManagerMetricsContainer;

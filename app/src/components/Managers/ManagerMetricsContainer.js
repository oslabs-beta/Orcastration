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
      shadow-xl text-slate-200 m-0 p-4 flex-col space-y-12 justify-between justify-items-center text-center'
    >
      <Metrics totalCPU={totalCPU} currentNode={currentNode} />
      <LoadingInformationContainer
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
};

export default ManagerMetricsContainer;

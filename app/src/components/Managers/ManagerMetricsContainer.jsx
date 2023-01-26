import React from 'react';
import ContainerHealthLogs from './ContainerHealthLogs.jsx';
import LoadingInformationContainer from '../LoadingInformation/LoadingInformationContainer';
import HealthStatusDisplay from './HealthStatusDisplay.jsx';

const ManagerMetricsContainer = ({
  currentStep,
  setCurrentStep,
  healthStatus,
}) => {
  return (
    <div
      className='managerMetricsContainer rounded-md bg-nightblue-800/60
      text-slate-200 m-0 p-4 space-y-4 text-center overflow-auto'
    >
      <ContainerHealthLogs healthStatus={healthStatus} />
      <HealthStatusDisplay healthStatus={healthStatus.Status} />
      <LoadingInformationContainer
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
};

export default ManagerMetricsContainer;

import React from 'react';
import CheckMark from '../../../assets/success-green-check-mark-icon.svg';
import RedX from '../../../assets/red-x-icon.svg';
import Warning from '../../../assets/warning-icon.svg';

export default function HealthStatusDisplay({ healthStatus }) {
  console.log('here is the health status:', healthStatus);
  const healthyOutput = {
    waiting: (
      <h1 className='text-slate-800'>
        Click "Check Health" to display a container's health status.
      </h1>
    ),
    // its status says "starting", but its actually going through the health check test and failing the test (failstreak)
    // it will test for x amt of times (however your healthcheck is configured) until the container is classified as unhealthy
    starting: (
      <h1 className='text-slate-800'>The container is still starting up.</h1>
    ),
    healthy: (
      <div className='grid grid-cols-2 items-center justify-center space-x-2'>
        <h1 className='text-green-600 text-semibold text-xl ml-auto'>
          Healthy
        </h1>
        <CheckMark className='w-1/5' />
      </div>
    ),
    unhealthy: (
      <div className='grid grid-cols-2 items-center justify-center space-x-2'>
        <h1 className='text-red-600 text-semibold text-xl ml-auto'>
          Unhealthy
        </h1>
        <RedX className='w-1/5' />
      </div>
    ),
    null: (
      <div className=''>
        <Warning className='w-4 mx-auto inline mb-2' />
        <span className='text-slate-800 text-semibold ml-2'>
          Health Check is not configured for the container.
        </span>
      </div>
    ),
  };

  return (
    <div className='rounded-md bg-slate-100/90 py-8 text-slate-900 flex items-center justify-center text-center px-6'>
      {healthStatus ? healthyOutput[healthStatus] : healthyOutput.null}
    </div>
  );
}

import React from 'react';

export default function LoadingInformation({ currentStep, setCurrentStep }) {
  const handleClick = () => {
    setCurrentStep('Start');
  };

  const loadingProgress = {
    Start: 'Starting up App',
    IDs: 'Retrieving Docker Swarm Nodes',
    Snapshot: 'Creating Snapshot of Current Docker Swarm Configuration',
    Ready: (
      <button
        onClick={handleClick}
        className='bg-nightblue-300 shadow-md rounded-md p-2 text-lg text-slate-100 animate-pulse transition ease-in-out duration-300 hover:bg-custompurple'
      >
        Start Streaming
      </button>
    ),
    Start: (
      <div>
        Streaming Docker Swarm Container Metrics &nbsp;
        <span className='ping bg-custompurple rounded-full animate-ping px-2'>
          &nbsp;
        </span>
      </div>
    ),
  };

  return (
    <div className='bg-slate-100/90 rounded-md py-8 text-slate-900 flex items-center justify-center text-center px-4'>
      {currentStep !== 'Ready' && currentStep !== 'Start' ? (
        <h1 className='font-medium'>{loadingProgress[currentStep]}</h1>
      ) : (
        loadingProgress[currentStep]
      )}
    </div>
  );
}

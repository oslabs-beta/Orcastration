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
        className='bg-nightblue-300 rounded-md p-2 text-lg text-slate-100'
      >
        Start Streaming
      </button>
    ),
    Start: 'Streaming Data',
  };

  return (
    <div className='bg-slate-100/90 mx-4 rounded-md h-1/5 text-slate-900 flex'>
      {loadingProgress[currentStep]}
    </div>
  );
}

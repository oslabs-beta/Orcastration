import React from 'react';

const ContainerHealthLogs = ({ healthStatus }) => {
  console.log('healthStatus', healthStatus);
  const { containerID, Log, FailingStreak } = healthStatus;
  console.log([Log, FailingStreak]);
  console.log('Log TYPE', Array.isArray(Log));
  const containerLogs = [];

  if (Log) {
    for (let i = 0; i < Log.length; i++) {
      containerLogs.push(
        <div key={Log[i].Start}>
          Start: {Log[i].Start}
          <br />
          End: {Log[i].End}
          <br />
          Exit Code: {Log[i].ExitCode}
          <br />
          <br />
        </div>
      );
    }
  }

  return (
    <div className='bg-slate-100/90 rounded-md py-4 px-2'>
      <h1 className='mainFontEl text-slate-800 border-b-2 border-slate-400 pb-4 mb-4 text-xl'>
        <span className='font-bold'>Viewing Container:</span> <br />
        Container ID: {containerID ? containerID.substring(0, 12) : null}
        <br />
      </h1>
      <div className='bg-neutral-900 text-left rounded-md text-slate-100 p-4 mb-4 overflow-y-scroll'>
        FailingStreak: {FailingStreak} <br /> <br /> Logs: <br /> <br />
        {containerLogs}
      </div>
    </div>
  );
};

export default ContainerHealthLogs;

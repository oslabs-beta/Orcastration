import React from 'react';
import { Pie } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);

const Metrics = ({ totalCPU, currentNode }) => {
  const cpuData = {
    labels: [`node memory usage`, 'available CPU'],
    datasets: [
      {
        label: 'manager test',
        data: [totalCPU, 100 - totalCPU],
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
        ],
        borderColor: 'black',
        borderWidth: 3,
      },
    ],
  };
  return (
    <div className='bg-slate-100/90 rounded-md py-4 px-2'>
      <h1 className='mainFontEl text-slate-800 border-b-2 border-slate-400 pb-4 mb-4 text-xl'>
        <span className='font-bold'>Viewing Node ID:</span> <br />
        {currentNode}
        <br />
      </h1>
      <Pie
        data={cpuData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'manager test??',
            },
          },
        }}
      />
    </div>
  );
};

export default Metrics;

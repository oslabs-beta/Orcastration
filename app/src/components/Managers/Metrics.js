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
    <div>
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

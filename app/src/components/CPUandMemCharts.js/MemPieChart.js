import React from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';

function MemPieChart({ memPerc }) {
  return (
    <Pie
      data={{
        labels: [
          `MEM usage: ${memPerc}`
        ],
        datasets: [
          {
            label: 'memory test',
            data: [parseFloat(memPerc), 100 - parseFloat(memPerc)],
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
      }}
      options={{
        plugins: {
          title: {
            display: true,
            text: 'container memory usage',
          },
          borderWidth: 1,
        },
      }}
    />
  );
}
export default MemPieChart;

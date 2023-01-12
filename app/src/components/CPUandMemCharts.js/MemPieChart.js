import React from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';

function MemPieChart({ memPerc }) {
  console.log('memPerc HEREEEEEE:', memPerc)
  // console.log(memoryData);
  return (
    <Pie
      data={{
        labels: [
          // dataTasks[i].containers[0].containerName,
          // 'max allowed memory',
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

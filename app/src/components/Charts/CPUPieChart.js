import React from 'react';
import { Pie } from 'react-chartjs-2';

function CPUPieChart({ CPUPerc }) {
  return (
    <Pie
      data={{
        labels: [`CPU usage: ${CPUPerc}`],
        datasets: [
          {
            label: 'cpu test',
            data: [parseFloat(CPUPerc), 100 - parseFloat(CPUPerc)],
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
            text: 'cpu usage vs max allowed cpu',
          },
        },
      }}
    />
  );
}
export default CPUPieChart;

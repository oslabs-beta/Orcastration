import React from 'react';
import { Pie } from 'react-chartjs-2';

function CPUPieChart({ chartData }) {
  // console.log(chartData);
  return (
    <div className='chart-container'>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'cpu usage vs max allowed cpu',
            },
          },
        }}
      />
    </div>
  );
}
export default CPUPieChart;

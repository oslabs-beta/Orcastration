import React from 'react';
import { Pie } from 'react-chartjs-2';

function MemPieChart({ memoryData }) {
  console.log(memoryData);
  return (
    <div className='chart-container'>
      <Pie
        data={memoryData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'container memory usage',
            },
          },
        }}
      />
      hello
    </div>
  );
}
export default MemPieChart;

import React from 'react';
import { Pie } from 'react-chartjs-2';

function MemPieChart({ memoryData }) {
  console.log(memoryData);
  return (
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
  );
}
export default MemPieChart;

// ORIGINAL IMPLENTATION THAT DOES NOT WORK AFTER DOWNGRADING VERSION OF MODULE TO INSTALL OTHER CHARTJS MODULES AND PLUGINS
// HAS TO DO WITH NOT USING USEEFFECT OR USESTATE PROPERLY, THE CHART'S MAX X-AXIS AND Y-AXIS NEVER RESETS
// import React from 'react';
// import { Doughnut, Pie } from 'react-chartjs-2';

// function PieChart({ perc }) {
//   return (
//       <Pie
//         data={{
//           labels: [`MEM usage: ${perc}`],
//           datasets: [
//             {
//               label: 'memory test',
//               data: [parseFloat(perc), 100 - parseFloat(perc)],
//               backgroundColor: [
//                 'rgba(75,192,192,1)',
//                 '#ecf0f1',
//                 '#50AF95',
//                 '#f3ba2f',
//                 '#2a71d0',
//               ],
//               borderColor: 'black',
//               borderWidth: 3,
//             },
//           ],
//         }}
//         options={{
//           plugins: {
//             title: {
//               display: true,
//               text: 'container memory usage',
//             },
//             borderWidth: 1,
//           },
//         }}
//       />
//   );
// }
// export default PieChart;

// we dont need to use useState or useEffect here since these components are only being rendered above when
// state changes for containerData. If we were not handling state management above, we would need to use it
// or if we wanted more control over the state to change the way our application is reacts, we would use it

// import React from 'react';
// import { Doughnut, Pie } from 'react-chartjs-2'; // we can choose to use Doughnut or Pie

// export default function PieChart({ perc }) {
//   // more modularized and readable to declare options separate from state in the chart
//   // by using containerStat and making a function, we dont need to create a separate file for both pie charts

//   const chartOptions = {
//     plugins: {
//       title: {
//         display: true,
//         text:
//           // containerStat === 'CPUPerc'
//           //   ? `Container CPU Usage Ratio: ${perc}`:
//           `Container MEM Usage Ratio: ${perc}`,
//       },
//       legend: {
//         display: true,
//         position: 'bottom',
//       },
//       borderWidth: 1,
//     },
//     maintainAspectRatio: false,
//   };

//   // define chartData
//   const chartData = {
//     labels: ['Hello', 'Bye'],
//     datasets: [
//       {
//         label: ['Greeting'],
//         data: [parseFloat(perc), 100 - parseFloat(perc)],
//         backgroundColor: [
//           // only need two colors since there are only two data points
//           'rgba(75,192,192,0.2)',
//           'rgba(153, 102, 255, 0.2)',
//         ],
//         borderColor: ['rgba(75,192,192,1)', 'rgba(153, 102, 255, 1)'],
//         borderWidth: 3,
//       },
//     ],
//   };

//   return (
//     <div className='h-48 w-48 mx-auto'>
//       <Pie data={chartData} options={chartOptions} />
//     </div>
//   );
// }

// Note that state changes for containerData. If we were not handling state management in a parent component above, we would need to use usestate and useeffect
// we need to use useState and useEffect here to have more control over the sideeffects because we only want to render the charts when perc changes
// if we dont use it, the charts will blink because containerStat will cause it to re-render

import React, { useEffect, useState } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2'; // decide which to use

export default function PieChart({ perc, containerStat }) {
  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text:
          containerStat === 'CPUPerc'
            ? `CPU Usage: ${perc}`
            : `MEM Usage: ${perc}`,
      },
      legend: {
        display: true,
        position: 'right',
        align: 'center',
        labels: {
          padding: 10,
        },
      },
      borderWidth: 1,
    },
    animation: {
      duration: 1500,
    },
    maintainAspectRatio: false,
  };

  // define chartData using useState
  const [chartData, setChartData] = useState({
    labels: ['Usage', 'Free Space'],
    datasets: [
      {
        label: 'Container Usage Ratio',
        data: [0, 0],
        backgroundColor: [
          // only need two colors since there are only two data points
          'rgba(75,192,192,0.2)', // decide what colors we want
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: ['rgba(75,192,192,1)', 'rgba(153, 102, 255, 1)'], // this has a different shade for border but same color
        borderWidth: 1,
        hoverOffset: 20,
      },
    ],
  });

  useEffect(() => {
    setChartData((prevChartData) => {
      return {
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: [parseFloat(perc), 100 - parseFloat(perc)],
          },
        ],
      };
    });
  }, [perc]);

  return (
    <div>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';
Chart.register(ChartStreaming);

export default function LineChart({ networkIO, change }) {
  // account for MB and GB as well
  const parseNetworkIO = (networkIO) => {
    const parsedNetworkIOList = networkIO.split('/');
    const unitCovertedNetworkIOList = [];
    parsedNetworkIOList.forEach((dataPoint) => {
      if (dataPoint.includes('kB'))
        unitCovertedNetworkIOList.push(parseFloat(dataPoint));
      else if (dataPoint.includes('MB'))
        unitCovertedNetworkIOList.push(parseFloat(dataPoint) * 1000);
      else if (dataPoint.includes('GB'))
        unitCovertedNetworkIOList.push(parseFloat(dataPoint) * 1000000);
      else unitCovertedNetworkIOList.push(parseFloat(dataPoint) / 1000);
    });
    return unitCovertedNetworkIOList;
  };

  // separate chartOptions for modularity
  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: `Network I/O: ${networkIO}`,
      },
      legend: {
        display: true,
        position: 'bottom',
      },
      streaming: {
        duration: 15000,
      },
    },
    tooltips: {
      enabled: true,
      mode: 'label',
    },
    scales: {
      x: {
        type: 'realtime',
        realtime: {
          duration: 15000,
          frameRate: 20,
          delay: 1000,
        },
        ticks: { color: 'rgba(4, 59, 92, 1)' },
        grid: {
          color: 'white',
          lineWidth: 1,
          display: true,
          drawBorder: false,
          borderDash: [6],
          border: false,
        },
      },
      y: {
        ticks: {
          color: 'green',
          callback: function (value) {
            return value + ' kB';
          },
        },
        grid: {
          color: 'white',
          lineWidth: 1,
          display: true,
        },
      },
    },
    elements: {
      line: {
        spanGaps: true,
      },
    },
    animation: { duration: 0 },
  };

  // use useState and useEffect
  const [chartData, setChartData] = useState({
    label: 'Network I/O',
    datasets: [
      {
        label: 'Network Input',
        data: [],
        backgroundColor: 'rgba(83, 149, 238, 0.3)',
        borderColor: 'rgba(83, 149, 238, 0.8)',
        borderWidth: 1,
        fill: true,
        lineTension: 0.3,
        spanGaps: true,
      },
      {
        label: 'Network Output',
        data: [],
        backgroundColor: 'rgba(229, 151, 47, 0.3)',
        borderColor: 'rgba(229, 151, 47, 0.8)',
        borderWidth: 1,
        fill: true,
        lineTension: 0.3,
        spanGaps: true,
      },
    ],
  });

  //useRef is not needed

  // use change as a dependency, since network i/o may be stagnant at times and will cause useEffect to not invoke
  useEffect(() => {
    const networkIODataPoints = parseNetworkIO(networkIO);
    // console.log('networkIODataPoints[0]', networkIODataPoints[0])
    setChartData((prevChartData) => {
      return {
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: prevChartData.datasets[0].data.concat({
              x: new Date(),
              y: networkIODataPoints[0],
            }),
          },
          {
            ...prevChartData.datasets[1],
            data: prevChartData.datasets[1].data.concat({
              x: new Date(),
              y: networkIODataPoints[1],
            }),
          },
        ],
      };
    });
  }, [change]);

  return (
    <div className = 'lineChart'>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

// import React, { useEffect, useState, useRef } from 'react';
// // imports chart.js library
// import Chart from 'chart.js/auto';
// // imports chartjs-adapter-luxon which allows us to use luxon library for date/time manipulation
// import 'chartjs-adapter-luxon';
// // import line chart type
// import { Line } from 'react-chartjs-2';
// // allows us to make real time updates to the chart
// import ChartStreaming from 'chartjs-plugin-streaming';
// // tells chart.js to draw the line chart with gaps where there are empty or null values from data
// Chart.overrides.line.spanGaps = false;
// // overhead for letting user use the chartsreaming plugin we import on line 11 to allow for real time updates
// Chart.register(ChartStreaming);

// //refer to https://www.chartjs.org/docs/latest/charts/line.html - Chart.js Line Chart doc
// export default function LineChart({ networkIO, change }) {
// // console.log('propData', propData) // "1.5kB / 0B"
// // console.log('change', change) // intialized to true
//   const chart = useRef();

//   function setData(dataObj) {
//     // chart.current is abvailable from const chart = useRef()
//     // checking if chart.current is defined (returns undefined if not) and if so, accesses chart.current.data.datasets[0].data ([1.5]) and pushes an object to it
//     chart.current?.data.datasets[0].data.push({
//       // for input
//       x: Number(dataObj.timestamp), // new Date()
//       y: dataObj.value1, // 1.5
//     }); // chart.current.data.datasets[0].data ([1.5, {x: 1/21/2023, y: 1.5}])
//     chart.current?.data.datasets[1].data.push({
//       // for output
//       x: Number(dataObj.timestamp),
//       y: dataObj.value2,
//     });
//     // suppress any animation from the chart while its being updated
//     chart.current?.update('quiet');
//   }

//   function dataSplit(string) {
//     if (!string) {
//       return [];
//     }
//     const result = [];
//     const stringArr = string.split(' / '); // changing string into an array => ['1.5kB', '0B']
//     stringArr.forEach((el) => {
//       let numEl;
//       if (el.includes('kB')) {
//         numEl = parseFloat(el);
//       } else {
//         numEl = parseFloat(el) / 1000;
//       }
//       result.push(numEl);
//     });
//     return result;
//   }

//   const dataArr = dataSplit(networkIO); // CONVERTING STRING I/O TO INTEGER I/O WITH SAME UNITS (kB), return sarray of length two => [1.5, 0]

//   const [chartData, setChartData] = useState({
//     datasets: [
//       {
//         label: ['Network Input'],
//         data: [dataArr[0]], // taking the input element => data: [1.5]
//         backgroundColor: 'rgba(229, 151, 47, 0.3)',
//         borderColor: 'rgba(229, 151, 47, 0.8)',
//         // fill: true,
//         lineTension: 0.3,
//         // spanGaps: true,
//       },
//       {
//         label: ['Network Output'],
//         data: [dataArr[1]], // tkaing the output element => data: [0]
//         backgroundColor: 'rgba(83, 149, 238, 0.3)',
//         borderColor: 'rgba(83, 149, 238, 0.8)',
//         // fill: true,
//         lineTension: 0.3,
//         // spanGaps: true,
//       },
//     ],
//   });

//   useEffect(() => {
//     const newData = {
//       value1: dataArr[0], // [1.5]
//       value2: dataArr[1], // [0]
//       timestamp: new Date(), // integer for current data/time
//     };
//     setData(newData); //  updates chartData.datasets[0].data
//     setChartData((prevState) => ({
//       ...prevState,
//       datasets: [
//         {
//           ...prevState.datasets[0],
//           backgroundColor: 'rgba(229, 151, 47, 0.3)',
//         },
//         {
//           ...prevState.datasets[1],
//           backgroundColor: 'rgba(83, 149, 238, 0.3)',
//         },
//       ],
//     }));
//   }, [change]);

//   return (
//     <div>
//       <Line
//         ref={chart}
//         data={chartData}
//         options={{
//           plugins: {
//             legend: {
//               display: true,
//               position: 'bottom',
//             },
//             streaming: {
//               duration: 20000,
//             },
//           },
//           scales: {
//             x: {
//               type: 'realtime',
//               realtime: {
//                 duration: 20000,
//                 frameRate: 20,
//                 delay: 1000,
//               },
//             },
//           },
//           elements: {
//             line: {
//               // spanGaps: true,
//             },
//           },
//         }}
//       />
//     </div>
//   );
// }

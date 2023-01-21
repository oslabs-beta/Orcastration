// import * as React from 'react';

// const { useEffect, useState, useRef } = React;
// // imports chart.js library
// import Chart from 'chart.js/auto';
// // imports chartjs-adapter-luxon which allows us to use luxon library for date/time manipulation
// import 'chartjs-adapter-luxon';
// // import line chart type
// import { Line } from 'react-chartjs-2';
// // allows us to make real time updates to the chart
// import ChartStreaming from 'chartjs-plugin-streaming';
// // tells chart.js to draw the line chart with gaps where there are empty or null values from data
// Chart.overrides.line.spanGaps = true;
// // overhead for letting user use the chartsreaming plugin we import on line 11 to allow for real time updates
// Chart.register(ChartStreaming);

// //refer to https://www.chartjs.org/docs/latest/charts/line.html - Chart.js Line Chart doc
// export default function NetworkLineChart({ propData, change }) {
//   // console.log('propData', propData) // "1.5kB / 0B"
//   // console.log('change', change) // intialized to true
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

//   const dataArr = dataSplit(propData); // CONVERTING STRING I/O TO INTEGER I/O WITH SAME UNITS (kB), return sarray of length two => [1.5, 0]

//   const [chartData, setChartData] = useState({
//     datasets: [
//       {
//         label: ['Network Input'],
//         data: [dataArr[0]], // taking the input element => data: [1.5]
//         backgroundColor: ['rgba(38, 189, 106, 0.75)'],
//         spanGaps: true,
//       },
//       {
//         label: ['Network Output'],
//         data: [dataArr[1]], // tkaing the output element => data: [0]
//         backgroundColor: ['rgba(221, 80, 105, 0.75)'],
//         spanGaps: true,
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
//           backgroundColor: ['rgba(38, 189, 106, 0.75)'],
//         },
//         {
//           ...prevState.datasets[1],
//           backgroundColor: ['rgba(221, 80, 105, 0.75)'],
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
//               spanGaps: true,
//             },
//           },
//         }}
//       />
//     </div>
//   );
// }

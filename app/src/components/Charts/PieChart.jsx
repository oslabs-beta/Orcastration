import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

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
          'rgba(75,192,192,0.2)',
          'rgba(36, 161, 252, 0.2)',
        ],
        borderColor: ['rgba(75,192,192,1)', '#19314D'],
        borderWidth: 1,
        // hoverOffset: 20,
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

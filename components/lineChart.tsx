import React from "react"
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [{
    axis: 'y',
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40].sort(),
    fill: false,
    backgroundColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 99, 132, 1)',
  }]
};

const options = {
  indexAxis: 'x',
  responsive: true,
  scales: {
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};


export const LineChart: React.FC = () => {
  return (
    // <Line type="line" data={data} options={options} />
    <></>
  )
}

import { time } from "console";
import React, { forwardRef, useEffect, useState } from "react"
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker'
import { Box, Button, Heading } from "rebass";
import { BlockChart } from "./blockChart";
import "react-datepicker/dist/react-datepicker.css";


const data = (canvas) => {
  function getGradient(context, rgb, start, height=200) {
    const chart = context.chart;
    const { ctx } = chart;

    const gradient = ctx.createLinearGradient(0, start, 0, start+height);
    gradient.addColorStop(0, `rgba(${rgb.join(",")}, 0.6)`);
    // gradient.addColorStop(0.5, "");
    gradient.addColorStop(1, `rgba(${rgb.join(",")}, 0.1)`);
    // gradient.addColorStop(1, `rgba(255, 255, 255, 1)`);
    return gradient;
  }

  return {
    datasets: [{
      // axis: 'y',
      label: 'PageView',
      data: [
        { x: 'Dec 24', y: 12 },
        { x: 'Dec 25', y: 45 },
        { x: 'Dec 26', y: 33 },
        { x: 'Dec 27', y: 22 },
        { x: 'Dec 28', y: 10 },
        { x: 'Dec 29', y: 11 },
        { x: 'Dec 30', y: 24 },
        { x: 'Dec 31', y: 15 },
        { x: 'Jan 1', y: 20 },
        { x: 'Jan 2', y: 10 },
      ],
      fill: true,
      tension: 0.3,
      backgroundColor: (context) => getGradient(context, [25, 74, 80], 250),
      borderColor: '#194a50',
      pointBackgroundColor: '#194a50',
      borderWidth: 0.8,
      pointRadius: 2,
      pointStyle: 'rectRounded',
    },
    {
      // axis: 'y',
      label: 'Clicks',
      data: [
        { x: 'Dec 24', y: 10 },
        { x: 'Dec 25', y: 55 },
        { x: 'Dec 26', y: 20 },
        { x: 'Dec 27', y: 12 },
        { x: 'Dec 28', y: 15 },
        { x: 'Dec 29', y: 17 },
        { x: 'Dec 30', y: 28 },
        { x: 'Dec 31', y: 14 },
        { x: 'Jan 1', y: 4 },
        { x: 'Jan 2', y: 20 },
      ],
      fill: true,
      tension: 0.3,
      backgroundColor: (context) => getGradient(context, [206, 90, 159], 150),
      borderColor: '#ce5a9f',
      pointBackgroundColor: '#ce5a9f',
      borderWidth: 0.8,
      pointRadius: 2,
      pointStyle: 'rectRounded',
    },
    {
      // axis: 'y',
      label: 'Change',
      data: [
        { x: 'Dec 24', y: 20 },
        { x: 'Dec 25', y: 6 },
        { x: 'Dec 26', y: 44 },
        { x: 'Dec 27', y: 29 },
        { x: 'Dec 28', y: 20 },
        { x: 'Dec 29', y: 11 },
        { x: 'Dec 30', y: 7 },
        { x: 'Dec 31', y: 8 },
        { x: 'Jan 1', y: 60 },
        { x: 'Jan 2', y: 25 },
      ],
      fill: true,
      tension: 0.3,
      backgroundColor: (context) => getGradient(context, [216, 178, 110], 150),
      borderColor: '#d8b26e',
      pointBackgroundColor: '#d8b26e',
      borderWidth: 0.8,
      pointRadius: 2,
      pointStyle: 'rectRounded',
    }
    ]
  }
}

const options = {
  aspectRatio: 1.7,
  indexAxis: 'x',
  responsive: true,
  layout: {
    padding: 8,
  },
  scales: {
    xAxes: {
      // type: 'time',
      grid: {
        borderColor: '#aaa',
        tickLength: 3,
        tickColor: '#aaa',
        borderDash: [2],
        color: '#efefef',
      },
      ticks: {
        padding: 10,
        color: '#aaa',
        font: {
          size: 11,
          family: `Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif`,
        },
      }
    },
    yAxes: {
      stacked: true,
      min: 0,
      max: 120, // make a get max function
      beginAtZero: true,
      ticks: {
        padding: 10,
        stepSize: 10,
        color: '#aaa',
        font: {
          size: 11,
          family: `Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif`,
        },
      },
      grid: {
        borderColor: '#aaa',
        tickLength: 3,
        borderDash: [2],
        tickColor: '#aaa',
        color: '#efefef',
      },
    }
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        pointStyle: 'rectRounded',
        boxWidth: 10,
        padding: 20,
        font: {
          size: 12,
          family: `Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif`,
        },
        usePointStyle: true,
      }
    },
    title: {
      display: false,
      position: 'top',
    },
  },
};


export const EventsPerDay: React.FC = () => {
  const defaultEndDate = new Date()
  const defaultStartDate = new Date();
  defaultStartDate.setMonth(defaultStartDate.getMonth() - 1)

  const [chartGrid, setChartGrid] = useState("linear")
  const [dateRange, setDateRange] = useState([defaultStartDate, defaultEndDate]);
  const [startDate, endDate] = dateRange;

  options.scales.yAxes.type = chartGrid


  const DateInput = forwardRef(({ value, onClick }, ref) => (
    <Button variant="primaryGhostSmall" onClick={onClick} ref={ref}>
      {value}
    </Button>
  ));
  // useEffect(() => {
  // }, [chartGrid]);

  return (
    <BlockChart
      header={
        <Heading as="h3">Events Per Day</Heading>
      }
      controlsLeft={
        <Button
          variant="primaryGhostSmall"
          onClick={() => {
            setChartGrid(chartGrid === 'linear' ? 'logarithmic' : 'linear')
          }}>
          Show {chartGrid === 'linear' ? 'logarithmic' : 'linear'}
        </Button>
      }

      controlsRight={
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          monthsShown={2}
          customInput={<DateInput />}
          onChange={(update) => {
            setDateRange(update);
          }}
        />
      }
    >
      <Line data={data} options={options} />
    </BlockChart>
  )
}

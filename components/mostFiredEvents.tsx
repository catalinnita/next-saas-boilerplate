import { time } from "console";
import React, { forwardRef, useEffect, useState } from "react"
import { Bar, Line } from 'react-chartjs-2';
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
    labels: ['Add to bag', 'Search', 'Open menu', 'Apply filters', 'Sale page', 'Place order', 'Returns'],
    datasets: [{
      axis: 'y',
      label: '30 Days',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: [
        '#ce5a9f',
        '#194a50',
        '#d8b26e',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(201, 203, 207, 1)'
      ],
      borderWidth: 0,
      barThickness: 16,
    },
    {
      axis: 'y',
      label: 'Previous week',
      data: [55, 60, 70, 66, 30, 22, 10],
      fill: false,
      backgroundColor: '#aaa',
      borderWidth: 3,
      borderColor: 'rgba(255, 255, 255, 0)',
      barThickness: 9,

    }]
  }
}

const options = {
  barValueSpacing: 2,
  aspectRatio: 1.7,
  indexAxis: 'y',
  responsive: true,
  layout: {
    padding: 8,
  },
  scales: {
    xAxes: {
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
      ticks: {
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
    },
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


export const MostFiredEvents: React.FC = () => {
  const defaultEndDate = new Date()
  const defaultStartDate = new Date();
  defaultStartDate.setMonth(defaultStartDate.getMonth() - 1)

  const [chartGrid, setChartGrid] = useState("linear")
  const [dateRange, setDateRange] = useState([defaultStartDate, defaultEndDate]);
  const [startDate, endDate] = dateRange;

  // options.scales.yAxes.type = chartGrid

  // @ts-ignore
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
        <Heading as="h3">Most fired events</Heading>
      }
      controlsLeft={
        <></>
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
      {/* <Bar type="bar" data={data} options={options} /> */}
    </BlockChart>
  )
}

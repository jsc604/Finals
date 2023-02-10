import { useParams } from "react-router-dom";
import useStockData from "../../hooks/useStockData";
import Chart from "react-apexcharts";
import moment from "moment";
import { useState } from "react";
import useStockChartData from "../../hooks/useStockChartData";

export default function ApexStockChart(props) {
  const { id: urlId } = useParams();
  const id = props.id || urlId;
  // console.log('-----id-----', id);
  const { data } = useStockChartData(id);

  
  if (!data) {
    return <div>Loading...</div>;
  }
  // console.log("DATA APEXSTOCKCHART: ", data);

  const chartData = data[1];

  const chartPlots = (chartData) => {
    for (let timeStamps in chartData) {
      let transformedValues = [];
      
      console.log('timestamps', chartData[timeStamps]);
      // console.log('open price', chartData[timeStamps].open);
      // console.log("timeStamp what is", timeStamps * 1000)
      transformedValues.push({ x: new Date(timeStamps *1000), y: [chartData[timeStamps].open, chartData[timeStamps].close, chartData[timeStamps].high, chartData[timeStamps].low]});
      console.log("transformedValues", transformedValues);
  
      return transformedValues;
    }
  }

// console.log('chart plots data', chartPlots(chartData));
let chartInput = chartPlots(chartData);
// console.log('-------chartInputs------', chartInput);

  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: `${id} Price Chart`,
      align: 'left',
      style: {
        color: 'white'
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: 'white'
        }
      },
      tooltip: {
        enabled: true,
        formatter: (value) => {
          return moment(value).format("MMM DD H:mm");
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors: 'white'
        }
      }
    },
    grid: {
      row: {
        colors: ['#343a40', '#343a40', '#343a40']
      },
      column: {
        colors: ['#343a40', '#343a40', '#343a40']
      },
      borderColor: '#344040'
    },
    tooltip: {
      style: {
        background: 'black',
        color: 'black'
      }
    }
  };

  if(!chartInput) {
    return <p>Loading...</p>
  };

  return (
      <div className="info-chart">
        <Chart options={options} series={[{ data: chartInput }]} type="candlestick" />
      </div>
  );
}

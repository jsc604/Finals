import { useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import useStockChartData from "../../hooks/useStockChartData";
import "../../styles/stockInfoPages.scss";
import dayjs from 'dayjs';


export default function ApexStockChart(props) {
  const { id: urlId } = useParams();
  const id = props.id || urlId;
  const { data } = useStockChartData(id);

  
  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = data[1];

  const chartPlots = (chartData) => {
    let transformedValues = [];
    for (let timeStamps in chartData) {
      
      // console.log('timestamps', chartData[timeStamps]);
      // console.log('open price', chartData[timeStamps].open);
      // console.log("timeStamp what is", timeStamps * 1000)
      transformedValues.push({ x: new Date(timeStamps *1000), y: [chartData[timeStamps].open, chartData[timeStamps].high, chartData[timeStamps].low, chartData[timeStamps].close]});

    }

    return transformedValues.slice(-(props.interval * 25));
  }

let chartInput = chartPlots(chartData);

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
      type: 'category',
      labels: {
        formatter: function(val) {
          return dayjs(val).format('MMM DD HH:mm')
        },
        style: {
          colors: 'white'
        }
      },
      tooltip: {
        enabled: true,
        formatter: function(val) {
          return dayjs(val).format('MMM DD HH:mm')
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
      },
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

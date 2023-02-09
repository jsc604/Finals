import { useParams } from "react-router-dom";
import useCryptoData from "../../hooks/useCryptoData";
import Chart from "react-apexcharts";
import moment from "moment";

export default function ApexCryptoChart(props) {
  const { id: urlId } = useParams();
  const id = props.id || urlId;

  const { cryptoData } = useCryptoData(
    `coins/${id}/ohlc?vs_currency=usd&days=${props.interval}`
  );

  if (!cryptoData) {
    return <div>Loading...</div>;
  }

  const chartData = cryptoData.map((value) => ({
    x: new Date(value[0]),
    y: [value[1], value[2], value[3], value[4]],
  }));

  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: `${id.charAt(0).toUpperCase() + id.slice(1)} ${props.interval}d Price Chart`,
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

  if(!chartData) {
    return <p>Loading...</p>
  };

  return (
      <div className="info-chart">
        <Chart options={options} series={[{ data: chartData }]} type="candlestick" />
      </div>
  );
}

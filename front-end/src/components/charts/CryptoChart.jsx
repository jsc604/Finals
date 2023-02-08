import { useParams } from "react-router-dom";
import useCryptoData from "../../hooks/useCryptoData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function CryptoChart(props) {
  const { id: urlId } = useParams();
  const id = props.id || urlId;

  const { cryptoData } = useCryptoData(
    `coins/${id}/market_chart?vs_currency=usd&days=${props.interval}`
  );

  if (!cryptoData) {
    return <div>Loading...</div>;
  }

  const chartData = cryptoData.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = { responsive: true };

  const data = {
    labels: chartData.map((value) => moment(value.x).format("MM-DD-H:MM")),
    datasets: [
      { 
        fill: true,
        label: id,
        data: chartData.map((value) => value.y),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  if(!data) {
    return <p>Loading...</p>
  };

  return (
      <div className="info-chart">
        <Line options={options} data={data} />
      </div>
  );
}

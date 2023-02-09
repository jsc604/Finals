import { useParams } from "react-router-dom";
import useStockInformation from "../../hooks/useStockInformation";
import "../../styles/infoPage.scss";
//import StockChart from "../charts/StockChart";
import { formatNumber, trendingDown, trendingUp } from "../../helpers/table_helpers";
import { useState } from "react";

export default function StockInfo(props) {
  const [favorite, setFavorite] = useState(false);
  const [interval, setInterval] = useState(7);

  const { id } = useParams();
  const { stockData } = useStockInformation(`${id}/15m`);

  return (
    <div className="info-page">
      <div className="header">
        <h1>{id}</h1>
        { favorite ? (
          <i
            className="fa fa-star"
            onClick={() => setFavorite(false)}
            style={{ color: "yellow" }}
          />
        ) : (
          <i
            className="fa fa-star-o"
            onClick={() => setFavorite(true)}
          />
        )}
      </div>

      <div className="interval-container">
        <button onClick={() => setInterval(1)}>1D</button>
        <button onClick={() => setInterval(7)}>1W</button>
        <button onClick={() => setInterval(30)}>1M</button>
        <button onClick={() => setInterval(365)}>1Y</button>
      </div>

      {/* <StockChart stockData={stockData} interval={interval} /> */}

      <table>
        <thead>
          <tr>
            <th>{id}</th>
            <th>Industry</th>
            <th>Sector</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>

            <tr>
              <td>{stockData[id].assetProfile.longBusinessSummary}</td>
              <td>{stockData[id].assetProfile.industry}</td>
              <td>{stockData[id].assetProfile.sector}</td>
              <td>{stockData[id].assetProfile.country}</td>
            </tr>

        </tbody>
      </table>
    </div>
  );
}
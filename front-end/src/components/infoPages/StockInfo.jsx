import { useParams } from "react-router-dom";
import StockInformation from "../../hooks/useStockInformation";
import StockData from "../../hooks/useStockData";
import "../../styles/infoPage.scss";

import { formatNumber, trendingDown, trendingUp } from "../../helpers/table_helpers";
import { useState } from "react";
import axios from "axios";
import ApexStockChart from "../charts/ApexStockChart";
import { useAuth0 } from "@auth0/auth0-react";


export default function StockInfo(props) {
  const [favorite, setFavorite] = useState(false);
  const [interval, setInterval] = useState('1d');

  const { id } = useParams();
  const stockInfoData = StockInformation(`/${id}/asset-profile`);
  const dataFromStocks = StockData( interval, `${id}/${interval}`);

  const {user} = useAuth0();

  console.log("dataFromStocks : ", dataFromStocks.data[0])



  const handleClick = () => {
    setFavorite(!favorite);
    const payload = {
      email: user.email,
      apiId: id,
      category: 'stock'
    };
    if (favorite) {
      axios.post('http://localhost:8080/favoriteDelete', payload)
        .then(result => {
          console.log('RESULT: ', result);
        })
        .catch(ex => {
          console.log(ex);
        });
    } else {
      axios.post('http://localhost:8080/favoriteInsert', payload)
        .then(result => {
          console.log('RESULT: ', result);
        })
        .catch(ex => {
          console.log(ex);
        });
    }
  };

  return (
    <div className="infos">
      {dataFromStocks.data[0] ? ( 
      <div className="header">
        <h1>{id}</h1>
        <div className="chart-info-container">
          <ApexStockChart interval={interval} id={id} />
            <div className="table-details">
              <table class="table table-sm">

                {/* TABLE INTERVAL BUTTONS */}
                <thead>
                  <tr>
                    <th scope = "col">
                      <button
                        className={interval === '1d' ? "btn btn-outline-light active" : "btn btn-outline-light"}
                        onClick={() => setInterval('1d')}
                        >
                          1 day
                        </button>
                    </th>
                    <th scope="col">
                      <button
                      className={interval === '1w' ? "btn btn-outline-light active" : "btn btn-outline-light"}
                      onClick={() => setInterval('1w')}
                      >
                        7 day
                      </button>
                    </th>
                    <th scope="col">
                      <button
                      className={interval === '1m' ? "btn btn-outline-light active" : "btn btn-outline-light"}
                      onClick={() => setInterval('1m')}
                      >
                        1 month
                      </button>
                    </th>
                    <th scope="col">
                      <button 
                        className={interval === '3m' ? "btn btn-outline-light active" : "btn btn-outline-light"}
                        onClick={() => setInterval('3m')} 
                      >
                        3 month
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={dataFromStocks.data[0].percentChange >= 0 ? 'positive' : 'negative'}>
                    {dataFromStocks.data[0].percentageChange >= 0 ? trendingUp : trendingDown} {dataFromStocks.data[0].percentageChange} <br/>
                      %{dataFromStocks.data[0].percentageChange}
                    </td>

                  </tr>
                </tbody>
              </table>

              {/* BASIC INFORMATION FROM CHART */}

              <div className="details">
                Current Price: <strong>
                  ${dataFromStocks.data[0].regularMarketPrice}
                </strong>
                <br />
                Previous Close: <strong>
                  ${dataFromStocks.data[0].previousClose}
                </strong>
                <br />

              </div>
              
              <button onClick={handleClick} className="btn btn-light add-to-watchlist">
              <i className={favorite ? "fa fa-star favorited" : "fa fa-star regular"}></i> Add to Watchlist
              </button>

              <p>
                {stockInfoData.longBusinessSummary}
              </p>

          {favorite ? (
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
          <button onClick={() => setInterval('1d')}>1D</button>
          <button onClick={() => setInterval('1w')}>1W</button>
          <button onClick={() => setInterval('1m')}>1M</button>
          <button onClick={() => setInterval('3m')}>Quarter</button>
        </div>

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
              <td>{stockInfoData.longBusinessSummary}</td>
              <td>{stockInfoData.industry}</td>
              <td>{stockInfoData.sector}</td>
              <td>{stockInfoData.country}</td>
            </tr>

          </tbody>
        </table>
        </div>
      </div>
      ) : null}
    </div>
  );
}


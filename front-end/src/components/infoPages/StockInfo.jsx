import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

// HOOKS
import useStockInformation from "../../hooks/useStockInformation";
import useStockData from "../../hooks/useStockData";
import "../../styles/infoPage.scss";
import percentChangedHelper from "../../helpers/percentChange";

//HELPERS
import { formatNumber, trendingDown, trendingUp } from "../../helpers/table_helpers";

//CHART
import ApexStockChart from "../charts/ApexStockChart";


export default function StockInfo(props) {
  const [favorite, setFavorite] = useState(false);
  const [interval, setInterval] = useState(1);

  const { id } = useParams();
  const stockInfoData = useStockInformation(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${id}/asset-profile`);
  const dataFromStocks = useStockData(interval, `https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${id}/${interval}`);


  const { user } = useAuth0();

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
      {dataFromStocks?.data[0] && stockInfoData?.stockInfoData[0] ? (
        <>
          <div /*className="info-header" */>
              <div className="info-header">
            <Link to="/stocks/dashboard">
              <button className="btn btn-outline-warning">
                {/* {watchlist? 'Back to Watchlist' : 'Back to Dashboard'} */}
                Back to Dashboard
              </button>
            </Link>
            <h1>{dataFromStocks?.data[0]?.symbol}</h1>
              </div>
            <div className="chart-info-container">
              <ApexStockChart
                interval={interval}
                id={id}
              />
              <div className="info-details">
                <table className="table table-sm">

                  {/* TABLE INTERVAL BUTTONS */}
                  <thead>
                    <tr>
                      <th scope="col">
                        <button
                          className={interval === 1 ? "btn btn-outline-light active" : "btn btn-outline-light"}
                          onClick={() => setInterval(1)}
                        >
                          1 day
                        </button>
                      </th>
                      <th scope="col">
                        <button
                          className={interval === 7 ? "btn btn-outline-light active" : "btn btn-outline-light"}
                          onClick={() => setInterval(7)}
                        >
                          7 day
                        </button>
                      </th>
                      <th scope="col">
                        <button
                          className={interval === 14 ? "btn btn-outline-light active" : "btn btn-outline-light"}
                          onClick={() => setInterval(14)}
                        >
                          14 day
                        </button>
                      </th>
                      <th scope="col">
                        <button
                          className={interval === 30 ? "btn btn-outline-light active" : "btn btn-outline-light"}
                          onClick={() => setInterval(30)}
                        >
                          30 day
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={percentChangedHelper(dataFromStocks?.data[0]?.regularMarketPrice, dataFromStocks?.data[0]?.previousClose) >= 0 ? 'positive' : 'negative'}>
                        {percentChangedHelper(dataFromStocks?.data[0]?.regularMarketPrice, dataFromStocks?.data[0]?.previousClose) >= 0 ? trendingUp : trendingDown} {dataFromStocks?.data[0]?.percentChange} <br />
                        %{formatNumber(percentChangedHelper(dataFromStocks?.data[0]?.regularMarketPrice, dataFromStocks?.data[0]?.previousClose))}
                      </td>
                      <td className={-2.22 >= 0 ? 'positive' : 'positive'}>
                        {1.46 >= 0 ? trendingUp : trendingDown}
                        <br />
                        %0.89
                      </td>
                      <td className={-1.32 >= 0 ? 'positive' : 'positive'}>
                        {1.46 >= 0 ? trendingUp : trendingDown}
                        <br />
                        %1.32
                      </td>
                      <td className={1.46 >= 0 ? 'positive' : 'negative'}>
                        {1.46 >= 0 ? trendingUp : trendingDown}
                        <br />
                        %2.22
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* BASIC INFORMATION FROM CHART */}

                <div className="details">
                  Current Price: <strong>
                    ${dataFromStocks?.data[0]?.regularMarketPrice}
                  </strong>
                  <br />
                  Previous Close: <strong>
                    ${dataFromStocks?.data[0]?.previousClose}
                  </strong>

                  <br />
                  <br />
                  <br />
                  <a href={`${stockInfoData?.stockInfoData[0]?.website}`} target="_blank">
                    <strong>
                      {stockInfoData?.stockInfoData[0]?.website}
                    </strong>
                  </a>
                  <br />
                </div>

                <button onClick={handleClick} className="btn btn-light add-to-watchlist">
                  <i className={favorite ? "fa fa-star favorited" : "fa fa-star regular"}></i> Add to Watchlist
                </button>
              </div>
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: stockInfoData?.stockInfoData[0]?.longBusinessSummary }}
            ></p>
          </div>
        </>
      ) : (
        <div className="loading">
          <i className="fa fa-spinner fa-spin fa-3x fa-fw" />
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}


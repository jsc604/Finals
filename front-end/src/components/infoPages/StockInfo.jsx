import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

// HOOKS
import "../../styles/infoPage.scss";
import percentChangedHelper from "../../helpers/percentChange";
import useStockInformationSingleCall from "../../hooks/useStockInformationSingleCall";
import useStockDataSingleCall from "../../hooks/useStockDataSingleCall";

//HELPERS
import { formatNumber, trendingDown, trendingUp } from "../../helpers/table_helpers";

//CHART
import ApexStockChart from "../charts/ApexStockChart";
import { watchlistContext } from "../../providers/WatchlistProvider";


export default function StockInfo(props) {
  const [favorite, setFavorite] = useState(false);
  const [interval, setInterval] = useState(1);
  const { watchlist } = useContext(watchlistContext);

  const { id } = useParams();
  const { data } = useStockInformationSingleCall(id);
  const { dataFromStocks } = useStockDataSingleCall(id);

  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:8080/checkIfFavorite', {
        params: {
          email: user.email,
          apiId: id,
          category: 'stocks'
        }
      })
      .then(result => {
        setFavorite(result.data.isFavorite);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [id, user]);

  const handleClick = () => {
    setFavorite(!favorite);
    const payload = {
      email: user.email,
      apiId: id,
      category: 'stocks'
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
      {dataFromStocks && data[0] ? (
        <>
          <div /*className="info-header" */>
              <div className="info-header">
            <Link to="/stocks/dashboard">
              <button className="btn btn-outline-info">
                {watchlist ? 'Back to Watchlist' : 'Back to Dashboard'}
              </button>
            </Link>
            <h1>{dataFromStocks[0].symbol}</h1>
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
                          className={interval === 1 ? "btn btn-outline-info active" : "btn btn-outline-info"}
                          onClick={() => setInterval(1)}
                        >
                          1 day
                        </button>
                      </th>
                      <th scope="col">
                        <button
                          className={interval === 7 ? "btn btn-outline-info active" : "btn btn-outline-info"}
                          onClick={() => setInterval(7)}
                        >
                          7 day
                        </button>
                      </th>
                      <th scope="col">
                        <button
                          className={interval === 14 ? "btn btn-outline-info active" : "btn btn-outline-info"}
                          onClick={() => setInterval(14)}
                        >
                          14 day
                        </button>
                      </th>
                      <th scope="col">
                        <button
                          className={interval === 30 ? "btn btn-outline-info active" : "btn btn-outline-info"}
                          onClick={() => setInterval(30)}
                        >
                          30 day
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={percentChangedHelper(dataFromStocks[0]?.regularMarketPrice, dataFromStocks[0].previousClose) >= 0 ? 'positive' : 'negative'}>
                        {percentChangedHelper(dataFromStocks[0].regularMarketPrice, dataFromStocks[0].previousClose) >= 0 ? trendingUp : trendingDown} {dataFromStocks[0].percentChange} <br />
                        %{formatNumber(percentChangedHelper(dataFromStocks[0].regularMarketPrice, dataFromStocks[0].previousClose))}
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
                    ${dataFromStocks[0].regularMarketPrice}
                  </strong>
                  <br />
                  Previous Close: <strong>
                    ${dataFromStocks[0].previousClose}
                  </strong>

                  <br />
                  <br />
                  <br />
                  <a href={`${data[0].website}`} target="_blank">
                    <strong>
                      {data[0].website}
                    </strong>
                  </a>
                  <br />
                </div>

                <button onClick={handleClick} className="btn btn-outline-info add-to-watchlist">
                  <i className={favorite ? "fa-solid fa-star favorited" : "fa-regular fa-star"}></i> {favorite? 'Remove from Watchlist' : 'Add to Watchlist'}
                </button>
              </div>
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: data[0]?.longBusinessSummary }}
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


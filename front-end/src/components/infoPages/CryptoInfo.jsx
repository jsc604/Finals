import { Link, useParams } from "react-router-dom";
import useCryptoData from "../../hooks/useCryptoData";
import "../../styles/infoPage.scss";
import { formatNumber, trendingDown, trendingUp } from "../../helpers/table_helpers";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import ApexCryptoChart from "../charts/ApexCryptoChart";
import { useContext } from "react";
import { watchlistContext } from "../../providers/WatchlistProvider";

export default function CryptoInfo(props) {
  const [favorite, setFavorite] = useState(false);
  const [interval, setInterval] = useState(7);
  const {watchlist} = useContext(watchlistContext);

  const { id } = useParams();
  const { cryptoData } = useCryptoData(
    `coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&sparkline=false`
  );

  const {user} = useAuth0();

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:8080/checkIfFavorite', {
        params: {
          email: user.email,
          apiId: id,
          category: 'crypto'
        }
      })
      .then(result => {
        setFavorite(result.data.isFavorite);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [user, id]);

  const handleClick = () => {
    setFavorite(!favorite);
    const payload = {
      email: user.email,
      apiId: id,
      category: 'crypto'
    }
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
      {cryptoData ? (
        <>
          <div className="info-header">
            <Link to="/crypto/dashboard">
              <button className="btn btn-outline-warning">
                {watchlist? 'Back to Watchlist' : 'Back to Dashboard'}
              </button>
            </Link>
            <h1>
              <img src={cryptoData.image.small} alt={cryptoData.name} />
              {cryptoData.name}
            </h1>
          </div>
          
          <div className="chart-info-container">
            <ApexCryptoChart interval={interval}/>
            <div className="info-details">
              <table class="table table-sm">
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
                    <td className={cryptoData.market_data.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                      {cryptoData.market_data.price_change_percentage_24h >= 0 ? trendingUp : trendingDown}<br/> 
                      {formatNumber(cryptoData.market_data.price_change_percentage_24h)} %
                    </td>
                    <td className={cryptoData.market_data.price_change_percentage_7d >= 0 ? 'positive' : 'negative'}>
                      {cryptoData.market_data.price_change_percentage_7d >= 0 ? trendingUp : trendingDown}<br/>
                      {formatNumber(cryptoData.market_data.price_change_percentage_7d)} %
                    </td>
                    <td className={cryptoData.market_data.price_change_percentage_14d >= 0 ? 'positive' : 'negative'}>
                      {cryptoData.market_data.price_change_percentage_14d >= 0 ? trendingUp : trendingDown}<br/>  
                      {formatNumber(cryptoData.market_data.price_change_percentage_14d)} %
                    </td>
                    <td className={cryptoData.market_data.price_change_percentage_30d >= 0 ? 'positive' : 'negative'}>
                      {cryptoData.market_data.price_change_percentage_30d >= 0 ? trendingUp : trendingDown}<br/>  
                      {formatNumber(cryptoData.market_data.price_change_percentage_30d)} %
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="details">
                Current Price: <strong>${formatNumber(cryptoData.market_data.current_price.usd)}</strong>
                <br />
                Market Cap: <strong>${formatNumber(cryptoData.market_data.market_cap.usd)}</strong> 
                <br />
                24hr volume: <strong>${formatNumber(cryptoData.market_data.total_volume.usd)}</strong>
                <br />
                24hr High: <strong>${formatNumber(cryptoData.market_data.high_24h.usd)}</strong>
                <br />
                24hr Low: <strong>${formatNumber(cryptoData.market_data.low_24h.usd)}</strong>
                <br/>
                Total Supply (<img src={cryptoData.image.thumb} alt="logo"/>): <strong>{formatNumber(cryptoData.market_data.total_supply)}</strong>
              </div>
              <button onClick={handleClick} className="btn btn-light add-to-watchlist">
                <i className={ favorite ? "fa-solid fa-star favorited" : "fa-regular fa-star"}></i> Add to Watchlist
              </button>
            </div>
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: cryptoData.description.en }}
          ></p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

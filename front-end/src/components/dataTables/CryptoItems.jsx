import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";

//STYLES
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

//HELPERS
import { trendingDown, trendingUp } from "../../helpers/table_helpers";
import { formatNumber } from "../../helpers/table_helpers";

//CHARTS
import CryptoChartDropdown from "./CryptoChartDropdown";
import ApexCryptoChart from "../charts/ApexCryptoChart";

export default function CryptoItems(props) {
  const [dropdown, setDropdown] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [interval, setInterval] = useState(7);

  const {user} = useAuth0();
  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
  };


  const percentChange = classNames({
    "positive": props.change >= 0,
    "negative": props.change < 0
  });

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:8080/checkIfFavorite', {
        params: {
          email: user.email,
          apiId: props.id,
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
  }, [user, props.id]);

  const handleClick = () => {

    const payload = {
      email: user.email,
      apiId: props.id,
      category: 'crypto'
    }
    if (favorite) {
      axios.post('http://localhost:8080/favoriteDelete', payload)
        .then(result => {
            for (let i of result.data.rows) {
              let sorted = props.watchlistIds.filter(id => id !== i['api_id']) 
            props.setWatchlistIds(sorted)
            setFavorite(!favorite);  
            
            axios.get(`http://localhost:8080/getFavoritesCrypto?email=${payload.email}`)
            .then((result) => {
              const ids = result.data.CryptoFavorites.map(favorite => favorite.api_id);
              props.setWatchlistIds(ids);
            })
            .catch((ex) => {
              console.log(ex);
            });
          }
        })
        .catch(ex => {
          console.log(ex);
        });
    } else {
      axios.post('http://localhost:8080/favoriteInsert', payload)
        .then(result => {
          setFavorite(!favorite);
          axios.get(`http://localhost:8080/getFavoritesCrypto?email=${payload.email}`)
          .then((result) => {
            const ids = result.data.CryptoFavorites.map(favorite => favorite.api_id);
            props.setWatchlistIds(ids);
          })
        })
        .catch(ex => {
          console.log(ex);
        });
    }
  };


  return (
    <>
      <tr>
        <td onClick={handleClick}>
          <i className={ favorite ? "fa-solid fa-star favorited" : "fa-regular fa-star"}></i>
        </td>

        <td>{props.rank}</td>

        <td className="symbol-data"> 
          <Link to={`/crypto/${props.id}`}>
            <img src={props.logo} alt="logo"/>  {props.name} ({props.symbol.toUpperCase()})
          </Link>
        </td>

        <td>${formatNumber(props.price)}</td>
        <td className={percentChange}>{props.change >= 0 ? trendingUp : trendingDown} {props.change} %</td>
        <td>${formatNumber(props.high)}</td>
        <td>${formatNumber(props.low)}</td>
        <td>${formatNumber(props.volume)}</td>
        <td>${formatNumber(props.marketCap)}</td>
        <td onClick={() => setDropdown(!dropdown)} ><button className="btn btn-outline-warning"><FontAwesomeIcon icon={faCaretDown} /></button></td>
      </tr>
      {dropdown && 
      <tr>
        <td colSpan={6} className="drop-down-chart">
          <ApexCryptoChart id={props.id} interval={interval}/>
        </td>
        <td colSpan={4}>
          <CryptoChartDropdown 
            onIntervalChange={handleIntervalChange} 
            interval={interval}
            id={props.id}
            supply={props.supply}
            ath={props.ath}
            athChange={props.athChange}
            atl={props.atl}
            atlChange={props.atlChange}
            oneDayChange={props.oneDayChange}
            sevenDayChange={props.sevenDayChange}
            fourteenDayChange={props.fourteenDayChange}
            thirtyDayChange={props.thirtyDayChange} 
            logo={props.logo}
          />
        </td>
      </tr>}
    </>
  );
};
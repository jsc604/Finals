import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { Link } from "react-router-dom";
import { trendingDown, trendingUp } from "../../helpers/table_helpers";
import classNames from "classnames";
import { formatNumber } from "../../helpers/table_helpers";
import CryptoChart from "../charts/CryptoChart";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import CryptoChartDropdown from "./CryptoChartDropdown";

export default function CryptoItems(props) {
  const [dropdown, setDropdown] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [interval, setInterval] = useState(7);;

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
  };

  const {user} = useAuth0();

  const percentChange = classNames({
    "positive": props.change >= 0,
    "negative": props.change < 0
  });

  const handleClick = () => {
    setFavorite(!favorite);
    const payload = {
      email: user.email,
      apiId: props.id,
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
        <td className={percentChange}>{props.change >= 0 ? trendingUp : trendingDown} {props.change}%</td>
        <td>${formatNumber(props.high)}</td>
        <td>${formatNumber(props.low)}</td>
        <td>${formatNumber(props.volume)}</td>
        <td>${formatNumber(props.marketCap)}</td>
        <td onClick={() => setDropdown(!dropdown)} ><button className="btn btn-outline-warning"><FontAwesomeIcon icon={faCaretDown} /></button></td>
      </tr>
      {dropdown && 
      <tr>
        <td colSpan={6}>
          <CryptoChart id={props.id} interval={interval}/>
        </td>
        <td colSpan={4}>
          <CryptoChartDropdown id={props.id} onIntervalChange={handleIntervalChange} interval={interval}/>
        </td>
      </tr>}
    </>
  );
};
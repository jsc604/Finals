import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { Link } from "react-router-dom";
import { trendingDown, trendingUp } from "../../helpers/table_helpers";
import classNames from "classnames";
import { formatNumber } from "../../helpers/table_helpers";

export default function CryptoItems(props) {

  const [dropdown, setDropdown] = useState(false);

  const percentChange = classNames({
    "positive": props.change >= 0,
    "negative": props.change < 0
  });
  
  return (
    <>
      <tr>
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
      {dropdown && <tr><td colSpan={9}>Chart</td></tr>}
    </>
  );
};
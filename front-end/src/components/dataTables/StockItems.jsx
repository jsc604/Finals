import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { trendingDown, trendingUp } from "../../helpers/table_helpers";
import { formatNumber } from "../../helpers/table_helpers";
import percentChangedHelper from "../../helpers/percentChange";

export default function StockItems(props) {

  
  console.log("props", props)
  console.log("props symbol", props.meta.symbol)
  console.log("props prev close", props.meta.previousClose)
  console.log("props current price", props.meta.regularMarketPrice)

  const [dropdown, setDropdown] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const percentChange = classNames({
    "positive": percentChangedHelper(props.meta.previousClose, props.meta.regularMarketPrice) >= 0,
    "negative": percentChangedHelper(props.meta.previousClose, props.meta.regularMarketPrice) < 0
  });

  const handleClick = () => {
    setFavorite(!favorite);
  };

  return (
    <>
      <tr>
        <td onClick={handleClick}>
          <i className={ favorite ? "fa-solid fa-star favorited" : "fa-regular fa-star"}></i>
        </td>

        <td className="symbol-data">
         <Link to={`/stocks/${props.id}`}>
         <img src={props.logo} alt="logo"/>  {props.meta.symbol}
         </Link> 
        </td>

        <td>{formatNumber(props.meta.previousClose)}</td>
        <td>{formatNumber(props.meta.regularMarketPrice)}</td>
        
        <td className={percentChange}>{props.change >= 0 ? trendingUp : trendingDown} {props.change}%</td>

        <td onClick={() => setDropdown(!dropdown)} ><button className="btn btn-outline-warning"><FontAwesomeIcon icon={faCaretDown} /></button></td>
      </tr>
      {dropdown && <tr><td colSpan={10}>Chart</td></tr>}
    </>
  );
};
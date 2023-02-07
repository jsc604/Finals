import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { trendingDown, trendingUp } from "../../helpers/table_helpers";
import { formatNumber } from "../../helpers/table_helpers";

export default function NftItems(props) {

  const [dropdown, setDropdown] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const percentChange = classNames({
    "positive": props.change >= 0,
    "negative": props.change < 0
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
         <Link to={`/nft/${props.id}`}>
            <img src={props.image} alt="logo"/>  {props.collection}
         </Link> 
        </td>

        <td><i className="fa-brands fa-ethereum"></i>{formatNumber(props.volume)}</td>
        <td><i className="fa-brands fa-ethereum"></i>{formatNumber(props.price)}</td>
        <td className={percentChange}>{props.change >= 0 ? trendingUp : trendingDown} {props.change}%</td>
        <td><i className="fa-brands fa-ethereum"></i>{formatNumber(props.marketCap)}</td>
        <td>{formatNumber(props.holders)}</td>
        <td className={percentChange}>{props.change >= 0 ? trendingUp : trendingDown} {formatNumber(props.holdersChange)}%</td>
        <td>{formatNumber(props.supply)}</td>
        <td onClick={() => setDropdown(!dropdown)} ><button className="btn btn-outline-warning"><FontAwesomeIcon icon={faCaretDown} /></button></td>
      </tr>
      {dropdown && <tr><td colSpan={10}>Chart</td></tr>}
    </>
  );
};
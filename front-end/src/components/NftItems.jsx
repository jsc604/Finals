import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import formatNumber from "../helpers/table_helpers";
import classNames from "classnames";
import "../styles/currencyItems.scss";
import { useState } from "react";

export default function NftItems(props) {

  const [dropdown, setDropdown] = useState(false);

  const percentChange = classNames({
    "positive": props.change >= 0,
    "negative": props.change < 0
  });

  return (
    <>
      <tr>
        <td>{props.collection}</td>
        <td><i className="fa-brands fa-ethereum"></i>{formatNumber(props.volume)}</td>
        <td><i className="fa-brands fa-ethereum"></i>{formatNumber(props.price)}</td>
        <td className={percentChange}>{props.change}%</td>
        <td><i className="fa-brands fa-ethereum"></i>{formatNumber(props.marketCap)}</td>
        <td>{formatNumber(props.holders)}</td>
        <td className={percentChange}>{formatNumber(props.holdersChange)}%</td>
        <td>{formatNumber(props.supply)}</td>
        <td onClick={() => setDropdown(!dropdown)} ><button className="btn btn-outline-warning"><FontAwesomeIcon icon={faCaretDown} /></button></td>
      </tr>
      {dropdown && <tr><td colSpan={9}>Chart</td></tr>}
    </>
  );
};
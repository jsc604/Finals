import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import formatNumber from "../helpers/table_helpers";
import classNames from "classnames";
import "../styles/currencyItems.scss";

export default function CurrencyItems(props) {
  const percentChange = classNames({
    "positive": props.change >= 0,
    "negative": props.change < 0
  });

  return (
    <tr>
      <td>{props.symbol.toUpperCase()}</td>
      <td>{props.name}</td>
      <td>${formatNumber(props.price)}</td>
      <td className={percentChange}>{props.change}%</td>
      <td>${formatNumber(props.high)}</td>
      <td>${formatNumber(props.low)}</td>
      <td>${formatNumber(props.volume)}</td>
      <td>${formatNumber(props.marketCap)}</td>
      <td><FontAwesomeIcon icon={faCaretDown} /></td>
    </tr>
  );
};
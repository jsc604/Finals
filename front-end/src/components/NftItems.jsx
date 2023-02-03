import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import formatNumber from "../helpers/table_helpers";
import classNames from "classnames";
import "../styles/currencyItems.scss";

export default function NftItems(props) {
  const percentChange = classNames({
    "positive": props.change >= 0,
    "negative": props.change < 0
  });

  return (
    <tr>
      <td>{props.collection}</td>
      <td><i class="fa-brands fa-ethereum"></i>{formatNumber(props.volume)}</td>
      <td><i class="fa-brands fa-ethereum"></i>{formatNumber(props.price)}</td>
      <td className={percentChange}>{props.change}%</td>
      <td><i class="fa-brands fa-ethereum"></i>{formatNumber(props.marketCap)}</td>
      <td><FontAwesomeIcon icon={faCaretDown} /></td>
    </tr>
  );
};
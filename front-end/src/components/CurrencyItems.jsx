import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

export default function CurrencyItems(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.symbol}</td>
      <td>{props.volume}</td>
      <td>{props.price}</td>
      <td>{props.change}</td>
      <td>{props.high}</td>
      <td>{props.low}</td>
      <td><FontAwesomeIcon icon={faCaretDown} /></td>
    </tr>
  );
};
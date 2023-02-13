// HELPERS
import { formatNumber, trendingUp, trendingDown } from "../../helpers/table_helpers";
// STYLES
import "../../styles/tableItems.scss";

export default function CryptoChartDropdown(props) {
  const { onIntervalChange } = props;
  
  return (
    <>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">
              <button className={ props.interval === 1 ? "btn btn-outline-info active" : "btn btn-outline-info" }
                onClick={() => onIntervalChange(1)}
              >
                1 day
              </button>
            </th>
            <th scope="col">
              <button className={ props.interval === 7 ? "btn btn-outline-info active" : "btn btn-outline-info" }
                onClick={() => onIntervalChange(7)}
              >
                7 day
              </button>
            </th>
            <th scope="col">
              <button className={ props.interval === 14 ? "btn btn-outline-info active" : "btn btn-outline-info" }
                onClick={() => onIntervalChange(14)}
              >
                14 day
              </button>
            </th>
            <th scope="col">
              <button className={ props.interval === 30 ? "btn btn-outline-info active" : "btn btn-outline-info" }
                onClick={() => onIntervalChange(30)}
              >
                30 day
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={ props.oneDayChange >= 0 ? "positive" : "negative" }>
              {props.oneDayChange >= 0 ? trendingUp : trendingDown}
              <br />
              {formatNumber(props.oneDayChange)} %
            </td>
            <td className={ props.sevenDayChange >= 0 ? "positive" : "negative" }>
              {props.sevenDayChange >= 0 ? trendingUp : trendingDown}
              <br />
              {formatNumber(props.sevenDayChange)} %
            </td>
            <td className={ props.fourteenDayChange >= 0 ? "positive" : "negative" }>
              {props.fourteenDayChange >= 0 ? trendingUp : trendingDown}
              <br />
              {formatNumber(props.fourteenDayChange)} %
            </td>
            <td className={ props.thirtyDayChange >= 0 ? "positive" : "negative" }>
              {props.thirtyDayChange >= 0 ? trendingUp : trendingDown}
              <br />
              {formatNumber(props.thirtyDayChange)} %
            </td>
          </tr>
        </tbody>
      </table>
      <div className="dropdown-details">
        All Time High Price: <strong>${formatNumber(props.ath)}</strong>
        <br/>
        All Time High Price Change: <strong>
          <td className={ (props.athChange) >= 0 ? "positive" : "negative" }> 
          {(props.athChange) >= 0 ? trendingUp : trendingDown} {formatNumber(props.athChange)} %
          </td>
        </strong>
        <br/>
        <br/>
        All Time Low Price: <strong>${formatNumber(props.atl)}</strong>
        <br/>
        All Time low Price Change: <strong>
          <td className={ (props.atlChange) >= 0 ? "positive" : "negative" }> 
          {(props.atlChange) >= 0 ? trendingUp : trendingDown} {formatNumber(props.atlChange)} %
          </td>
        </strong>
        <br/>
        <br/>
        All Time High & Low Difference: <strong>
          <td className={ (props.ath) / (props.atl) * 100 >= 0 ? "positive" : "negative"}>
          {(props.ath) / (props.atl) * 100 >= 0 ? trendingUp : trendingDown} {formatNumber((props.ath) / (props.atl) * 100) } %
          </td>
          </strong>
        <br/>
        <br/>
        Total Supply (<img src={props.logo} alt="logo"/>): <strong>{formatNumber(props.supply)}</strong>
      </div>
    </>
  );
}

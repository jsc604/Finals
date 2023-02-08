import { formatNumber, trendingUp, trendingDown } from "../../helpers/table_helpers";
import useCryptoData from "../../hooks/useCryptoData";

export default function CryptoChartDropdown(props) {
  const { onIntervalChange } = props;
  const { cryptoData } = useCryptoData(
    `coins/${props.id}?localization=false&tickers=false&market_data=true&community_data=false&sparkline=false`
  );

  if (!cryptoData) {
    return <p>Loading...</p>
  }
  
  return (
    <>
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">
              <button className={ props.interval === 1 ? "btn btn-outline-light active" : "btn btn-outline-light" }
                onClick={() => onIntervalChange(1)}
              >
                1 day
              </button>
            </th>
            <th scope="col">
              <button className={ props.interval === 7 ? "btn btn-outline-light active" : "btn btn-outline-light" }
                onClick={() => onIntervalChange(7)}
              >
                7 day
              </button>
            </th>
            <th scope="col">
              <button className={ props.interval === 14 ? "btn btn-outline-light active" : "btn btn-outline-light" }
                onClick={() => onIntervalChange(14)}
              >
                14 day
              </button>
            </th>
            <th scope="col">
              <button className={ props.interval === 30 ? "btn btn-outline-light active" : "btn btn-outline-light" }
                onClick={() => onIntervalChange(30)}
              >
                30 day
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={ cryptoData.market_data.price_change_percentage_24h >= 0 ? "positive" : "negative" }>
              {cryptoData.market_data.price_change_percentage_24h >= 0 ? trendingUp : trendingDown}
              <br />
              {formatNumber(cryptoData.market_data.price_change_percentage_24h)} %
            </td>
            <td className={ cryptoData.market_data.price_change_percentage_7d >= 0 ? "positive" : "negative" }>
              {cryptoData.market_data.price_change_percentage_7d >= 0 ? trendingUp : trendingDown}
              <br />
              {formatNumber(cryptoData.market_data.price_change_percentage_7d)} %
            </td>
            <td className={ cryptoData.market_data.price_change_percentage_14d >= 0 ? "positive" : "negative" }>
              {cryptoData.market_data.price_change_percentage_14d >= 0 ? trendingUp : trendingDown}
              <br />
              {formatNumber(cryptoData.market_data.price_change_percentage_14d)} %
            </td>
            <td className={ cryptoData.market_data.price_change_percentage_30d >= 0 ? "positive" : "negative" }>
              {cryptoData.market_data.price_change_percentage_30d >= 0 ? trendingUp : trendingDown}
              <br />
              {formatNumber(cryptoData.market_data.price_change_percentage_30d)} %
            </td>
          </tr>
        </tbody>
      </table>
      <div className="dropdown-details">
        All Time High Price: <strong>${formatNumber(cryptoData.market_data.ath.usd)}</strong>
        <br/>
        All Time Low Price: <strong>${formatNumber(cryptoData.market_data.atl.usd)}</strong>
        <br/>
        All Time High & Low Difference: <strong >{formatNumber((cryptoData.market_data.ath.usd) / (cryptoData.market_data.atl.usd) * 100) } %</strong>
        <br/>
        Total Supply (<img src={cryptoData.image.thumb} alt="logo"/>): <strong>{formatNumber(cryptoData.market_data.total_supply)}</strong>
      </div>
    </>
  );
}

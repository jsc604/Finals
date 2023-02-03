import CurrencyItems from "./CurrencyItems";
import coinData from "../samples/coinData";

export default function CurrencyTable(props) {
  let currencyItems = coinData.map((token, i) => (
    <CurrencyItems
      key={i}
      symbol={token.symbol}
      name={token.name}
      volume={token.total_volume}
      price={token.current_price}
      change={token.price_change_percentage_24h}
      high={token.high_24h}
      low={token.low_24h}
      marketCap={token.market_cap}
    />
  ));

  return (
    <table className="table table-dark table-hover">
      <thead>
        <tr>
          <th scope="col">Symbol</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">24hr Change</th>
          <th scope="col">24hr High</th>
          <th scope="col">24hr Low</th>
          <th scope="col">Volume</th>
          <th scope="col">Market Cap</th>
          <th scope="col">Chart</th>
        </tr>
      </thead>
      <tbody>
        {currencyItems}
      </tbody>
    </table>
  );
};

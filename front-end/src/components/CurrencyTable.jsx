import CurrencyItems from "./CurrencyItems";
import coinData from "../samples/coinData";

export default function CurrencyTable(props) {
  let currencyItems = coinData.map((coin, i) => (
    <CurrencyItems
      key={i}
      symbol={coin.symbol}
      name={coin.name}
      volume={coin.total_volume}
      price={coin.current_price}
      change={coin.price_change_percentage_24h}
      high={coin.high_24h}
      low={coin.low_24h}
      marketCap={coin.market_cap}
    />
  ));

  return (
    <table class="table table-dark table-hover">
      <thead>
        <tr>
          <th scope="col">Symbol</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">24 hr change</th>
          <th scope="col">24 hr high</th>
          <th scope="col">24 hr low</th>
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

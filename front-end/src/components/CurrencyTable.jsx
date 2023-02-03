import CurrencyItems from "./CurrencyItems";
import coinData from "../samples/coinData";

export default function CurrencyTable(props) {
  let currencyItems = coinData.map((coin, i) => (
    <CurrencyItems
      key={i}
      name={coin.name}
      symbol={coin.symbol}
      volume={coin.total_volume}
      price={coin.current_price}
      change={coin.price_change_percentage_24h}
      high={coin.high_24h}
      low={coin.low_24h}
    />
  ));

  return (
    <table class="table table-bordered table-dark table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Symbol</th>
          <th scope="col">Volume(usd)</th>
          <th scope="col">Price(usd)</th>
          <th scope="col">24 hr change(%)</th>
          <th scope="col">24 hr high(usd)</th>
          <th scope="col">24 hr low(usd)</th>
          <th scope="col">Chart</th>
        </tr>
      </thead>
      <tbody>
        {currencyItems}
      </tbody>
    </table>
  );
}

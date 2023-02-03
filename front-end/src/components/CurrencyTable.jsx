import CurrencyItems from "./CurrencyItems";

export default function CurrencyTable(props) {
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
        <CurrencyItems />
      </tbody>
    </table>
  );
}

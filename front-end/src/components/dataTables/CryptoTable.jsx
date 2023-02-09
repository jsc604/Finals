import CryptoItems from "./CryptoItems";
import { useState } from "react";
import "../../styles/tableItems.scss";

export default function CryptoTable(props) {

  const [sortedData, setSortedData] = useState(props.data);
  const [order, setOrder] = useState("asc");
  const [sortKey, setSortKey] = useState("");

  const sortData = (key) => {
    let newSortedData = [...sortedData];
    if (sortKey === key) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setOrder("asc");
    };

    newSortedData.sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];
      if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      if (order === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    setSortedData(newSortedData);
  };

  let currencyItems = sortedData.map((token, i) => (
    <CryptoItems
      key={i}
      rank={token.market_cap_rank}
      logo={token.image}
      symbol={token.symbol}
      name={token.name}
      volume={token.total_volume}
      price={token.current_price}
      change={token.price_change_percentage_24h}
      high={token.high_24h}
      low={token.low_24h}
      marketCap={token.market_cap}
      id={token.id}

      supply={token.total_supply}
      ath={token.ath}
      athChange={token.ath_change_percentage}
      atl={token.atl}
      atlChange={token.atl_change_percentage}
      oneDayChange={token.price_change_percentage_24h_in_currency}
      sevenDayChange={token.price_change_percentage_7d_in_currency}
      fourteenDayChange={token.price_change_percentage_14d_in_currency}
      thirtyDayChange={token.price_change_percentage_30d_in_currency}
    />
  ));

  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th></th>
          <th scope="col" onClick={() => sortData('market_cap_rank')}>Rank</th>
          <th scope="col" onClick={() => sortData('name')}>Token</th>
          <th scope="col" onClick={() => sortData('current_price')}>Price</th>
          <th scope="col" onClick={() => sortData('price_change_percentage_24h')}>24hr Change</th>
          <th scope="col" onClick={() => sortData('high_24h')}>24hr High</th>
          <th scope="col" onClick={() => sortData('low_24h')}>24hr Low</th>
          <th scope="col" onClick={() => sortData('total_volume')}>Volume</th>
          <th scope="col" onClick={() => sortData('market_cap')}>Market Cap</th>
          <th scope="col">Chart</th>
        </tr>
      </thead>
      <tbody>
        {currencyItems}
      </tbody>
    </table>
  );
};

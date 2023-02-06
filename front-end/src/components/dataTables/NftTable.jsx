import NftItems from "./NftItems";
import { useState } from "react";
import "../../styles/tableItems.scss";

export default function NftTable(props) {

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

  let nftItems = sortedData.map((nft, i) => (
    <NftItems
      key={i}
      image={nft.image.small}
      collection={nft.name}
      volume={nft.volume_24h.native_currency}
      price={nft.floor_price.native_currency}
      change={nft.floor_price_in_usd_24h_percentage_change}
      marketCap={nft.market_cap.usd}
      holders={nft.number_of_unique_addresses}
      holdersChange={nft.number_of_unique_addresses_24h_percentage_change}
      supply={nft.total_supply}
      id={nft.id}
    />
  ));

  return (
    <table className="table table-dark table-hover">
      <thead>
        <tr>
          <th scope="col" onClick={() => sortData('name')}>Collection</th>
          <th scope="col" onClick={() => sortData('native_currency')}>24hr Volume</th>
          <th scope="col" onClick={() => sortData('native_currency')}>Floor Price</th>
          <th scope="col" onClick={() => sortData('floor_price_in_usd_24h_percentage_change')}>24hr Change</th>
          <th scope="col" onClick={() => sortData('usd')}>Market Cap</th>
          <th scope="col" onClick={() => sortData('number_of_unique_addresses')}>Holders</th>
          <th scope="col" onClick={() => sortData('number_of_unique_addresses_24h_percentage_change')}>24hr Holders</th>
          <th scope="col" onClick={() => sortData('total_supply')}>Supply</th>
          <th scope="col">Chart</th>
        </tr>
      </thead>
      <tbody>{nftItems}</tbody>
    </table>
  );
}

import { useState } from "react";

// COMPONENTS
import StockItems from "./StockItems";

// STYLES
import "../../styles/tableItems.scss";


export default function StockTable(props) {

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
    
    const nameKeyMapping = {name: "symbol", lastClose: "previousClose", percentChange: "percentageChange", currentPrice: "regularMarketPrice"};

    const translatedKey = nameKeyMapping[key];

    newSortedData.sort((a, b) => {
      let valueA = a[translatedKey];
      let valueB = b[translatedKey];
  
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

  let stockItems = sortedData.map((stock, i) => (
    <StockItems
    key={i}
    stock={stock.symbol}
    price={stock.regularMarketPrice}
    prevClose={stock.previousClose}
    change={stock.percentageChange}
    id={stock.symbol}
    setWatchlistIds={props.setWatchlistIds}
    watchlistIds={props.watchlistIds}
    />
  ));

  return (
    <table className="table table-dark table-hover">
      <thead>
        <tr>
          <th></th>
          <th scope="col" onClick={() => sortData('name')}>Stock</th>
          <th scope="col" onClick={() => sortData('regularMarketPrice')}>Current Price</th>
          <th scope="col" onClick={() => sortData('lastClose')}>Last market Close</th>
          <th scope="col" onClick={() => sortData('percentChange')}>Daily Change</th>


          <th scope="col">Chart</th>
        </tr>
      </thead>
      <tbody>{stockItems}</tbody>
    </table>
  );
}

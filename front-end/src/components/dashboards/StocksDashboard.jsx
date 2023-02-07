// import StockTable from "../dataTables/StockTable";
// import Navigation from "../Navigation";
// import useStockData from "../../hooks/useStockData";

// export default function StocksDashboard(props) {
//   const { stockData } = useStockData();
//   console.log("stockData", stockData)
//   return (
//     <main>
//       <h1><strong>Top Stocks</strong></h1>
//       <Navigation tab={'stocks'} />
//       {stockData && stockData.length !==0 && <StockTable data={stockData} />}
//     </main>
//   );
// }

import StockTable from "../dataTables/StockTable";
import Navigation from "../Navigation";
import useStockData from "../../hooks/useStockData";

export default function StocksDashboard(props) {
  const { stockData } = useStockData();
  return (
    <main>
      <h1><strong>Top Stocks</strong></h1>
      <Navigation tab={'stocks'} />
      {stockData && Object.keys(stockData).length !== 0 && <StockTable data={stockData} />}
    </main>
  );
}

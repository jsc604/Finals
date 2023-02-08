import StockTable from "../dataTables/StockTable";
import Navigation from "../Navigation";
import useStockData from "../../hooks/useStockData";

export default function StocksDashboard(props) {
  const { data } = useStockData();
  return (
    <main>
      <h1><strong>Top Stocks</strong></h1>
      <Navigation tab={'stocks'} />
      {data && data.length && <StockTable data={data} />}
    </main>
  );
}

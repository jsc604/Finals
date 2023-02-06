import "../styles/tableItems.scss";
import {formatNumber} from "../helpers/table_helpers";
import CryptoTable from "./dataTables/CryptoTable";
import coinData from "../samples/coinData";
import Navigation from "./Navigation";

export default function StocksDashboard(props) {

  return (
    <main>
      <h1><strong>Top Stocks</strong></h1>
      <Navigation tab={'stocks'} />
      {coinData && <CryptoTable formatNumber={formatNumber} data={coinData} />}
    </main>
  );
}

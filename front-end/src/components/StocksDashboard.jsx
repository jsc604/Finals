import "../styles/tableItems.scss";
import formatNumber from "../helpers/table_helpers";
import { Link } from "react-router-dom";
import CryptoTable from "./dataTables/CryptoTable";
import coinData from "../samples/coinData";
import Navigation from "./Navigation";

export default function StocksDashboard(props) {

  return (
    <main>
      <Navigation tab={'stocks'} />
      {coinData && <CryptoTable formatNumber={formatNumber} data={coinData} />}
    </main>
  );
}

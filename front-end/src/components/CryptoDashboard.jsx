import CryptoTable from "./dataTables/CryptoTable";
import "../styles/tableItems.scss";
import {formatNumber} from "../helpers/table_helpers";
import useCryptoData from "../hooks/useCryptoData";
import Navigation from "./Navigation";

export default function CryptoDashboard(props) {
  const { cryptoData, loading } = useCryptoData('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'); 
   
  return (
    <main>
      <Navigation tab={'crypto'} />
      {cryptoData && <CryptoTable formatNumber={formatNumber} data={cryptoData} />}
    </main>
  );
};

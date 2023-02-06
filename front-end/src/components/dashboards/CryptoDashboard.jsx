import CryptoTable from "../dataTables/CryptoTable";
import useCryptoData from "../../hooks/useCryptoData";
import Navigation from "../Navigation";

export default function CryptoDashboard(props) {
  const { cryptoData, loading } = useCryptoData('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'); 
   
  return (
    <main>
      <h1><strong>Top Crypto Currencies</strong></h1>
      <Navigation tab={'crypto'} />
      {cryptoData && <CryptoTable data={cryptoData} />}
    </main>
  );
};

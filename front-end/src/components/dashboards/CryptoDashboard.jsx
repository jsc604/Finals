import CryptoTable from "../dataTables/CryptoTable";
import useCryptoData from "../../hooks/useCryptoData";
import Navigation from "../Navigation";
import { useState } from "react";

export default function CryptoDashboard(props) {
  const [watchlist, setWatchlist] = useState(false);

  const { cryptoData } = useCryptoData('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'); 

  const watchlistToggle = () => {
    setWatchlist(watchlist === false ? true : false);
  };


  return (
    <main>
      <h1><strong>Top Crypto Currencies</strong></h1>
      <Navigation tab={'crypto'} toggle={watchlistToggle}/>
      {cryptoData && <CryptoTable data={cryptoData} />}
    </main>
  );
};

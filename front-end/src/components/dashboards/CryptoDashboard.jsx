import CryptoTable from "../dataTables/CryptoTable";
import useCryptoData from "../../hooks/useCryptoData";
import Navigation from "../Navigation";
import { useState } from "react";

export default function CryptoDashboard(props) {
  const [watchlist, setWatchlist] = useState(false);

  const watchlistToggle = () => {
    setWatchlist(watchlist === false ? true : false);
  };

  const { cryptoData } = useCryptoData('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C14d%2C30d'); 

  const buildAPIUrl = (ids) => {
    const idString = ids.join("%2C%20");
    return `coins/markets?vs_currency=usd&ids=${idString}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C14d%2C30d`;
  };


  const watchlistIds = ["bitcoin", "ethereum", "binancecoin"];
  const apiUrl = buildAPIUrl(watchlistIds);
  

  return (
    <main>
      <h1><strong>Top Crypto Currencies</strong></h1>
      <Navigation tab={'crypto'} toggle={watchlistToggle} watchlistStatus={watchlist}/>
      {cryptoData && <CryptoTable data={cryptoData} />}
    </main>
  );
};

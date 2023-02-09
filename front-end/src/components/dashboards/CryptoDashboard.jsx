import CryptoTable from "../dataTables/CryptoTable";
import useCryptoData from "../../hooks/useCryptoData";
import Navigation from "../Navigation";
import { useContext } from "react";
import { watchlistContext } from "../../providers/WatchlistProvider";

export default function CryptoDashboard(props) {
  const {watchlist} = useContext(watchlistContext);
  const buildAPIUrl = (ids) => {
    const idString = ids.join("%2C%20");
    return `coins/markets?vs_currency=usd&ids=${idString}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C14d%2C30d`;
  };
  
  const watchlistIds = ["bitcoin", "ethereum", "binancecoin"];
  let watchlistApi = buildAPIUrl(watchlistIds);

  const { cryptoData } = useCryptoData(watchlist ? watchlistApi : '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C14d%2C30d');
  
  return (
      <main>
        <h1><strong>Top Crypto Currencies</strong></h1>
        <Navigation tab={'crypto'} />
        {cryptoData && <CryptoTable data={cryptoData} />}
      </main>
  );
};

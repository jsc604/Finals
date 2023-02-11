import StockTable from "../dataTables/StockTable";
import Navigation from "../Navigation";
import useStockData from "../../hooks/useStockData";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { watchlistContext } from "../../providers/WatchlistProvider";

const topStockArray = ['AAPL', 'TSLA', 'MSFT', 'ARKK', 'KO'];


export default function StocksDashboard(props) {
  const { data } = useStockData();
  const { watchlist } = useContext(watchlistContext);
  const [watchlistIds, setWatchlistIds] = useState([]);
  const { isLoading, user } = useAuth0();
  
  const payload = user?.email;
  
  useEffect(() => {
      
      axios.get(`http://localhost:8080/getFavoritesStocks?email=${payload}`)
      .then((result) => {
        const ids = result.data.stockFavorites.map(favorite => favorite.api_id);
        setWatchlistIds(ids);
      })
      .catch((ex) => {
        console.log(ex);
      });
    },[payload])
  
  const {result}  = useStockData(watchlist ? watchlistIds : topStockArray);

  if(isLoading) {
    return null;
  };


  return (
    <main>
      <h1><strong>{watchlist ? 'Stocks Watchlist' : 'Top Stocks Collections'}</strong></h1>
      <Navigation tab={'stocks'} />
      {result && result.length !== 0 && <StockTable data={result} setWatchlistIds={setWatchlistIds} watchlistIds={watchlistIds} />}
    </main>
  );
}

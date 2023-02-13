import StockTable from "../dataTables/StockTable";
import Navigation from "../Navigation";
import useStockData from "../../hooks/useStockData";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { watchlistContext } from "../../providers/WatchlistProvider";
import { Link } from "react-router-dom";

const topStockArray = ['AAPL', 'TSLA', 'MSFT', 'META', 'KO'];


export default function StocksDashboard(props) {
  const { watchlist } = useContext(watchlistContext);
  const [watchlistIds, setWatchlistIds] = useState([]);
  const { isLoading, user } = useAuth0();
  const [searchValue, setSearchValue] = useState("");
  
  
  // _________________COMMENTED OUT TO CHECK FOR USABILITY___________________
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
        
        
  const { data } = useStockData(watchlist? watchlistIds : topStockArray);
  
  if(isLoading) {
    return null;
  };

  return (
    <main>
      <h1><strong>{watchlist ? 'Stocks Watchlist' : 'Top Stocks Collections'}</strong></h1>
      <div>
        <form className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <Link to={`/stocks/${searchValue.replace(/\s+/g, '-').toLowerCase()}`}>&nbsp;
            <button className="search-button btn btn-outline-warning"><i class="fa-solid fa-magnifying-glass"></i></button>
          </Link>
        </form>
      </div>
      {/* ___________COMMENTED OUT TO CHECK FOR USABILITY______________ */}
      {/* <Navigation tab={'stocks'} />
      {result && result.length !== 0 && <StockTable data={result} setWatchlistIds={setWatchlistIds} watchlistIds={watchlistIds} />} */}

      {/* ____________CODE BELOW IS ADDED FOR CHECKING_________ */}
      <Navigation tab={'stocks'} />
      {data && data.length && <StockTable data={data} />}
    </main>
  );
}

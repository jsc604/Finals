import StockTable from "../dataTables/StockTable";
import Navigation from "../Navigation";
import useStockData from "../../hooks/useStockData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function StocksDashboard(props) {
  const { data } = useStockData();
  const [watchlist, setWatchlist] = useState(false);
  const [searchValue, setSearchValue] = useState("");


  const watchlistToggle = () => {
    setWatchlist(watchlist === false ? true : false);
  };


  return (
    <main>
      <div>
      <h1><strong>Top Stocks</strong></h1>
        <form className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
           onChange={(event) => setSearchValue(event.target.value)}
          />
          <Link to={`/stocks/${searchValue.replace(/\s+/g, '-').toLowerCase()}`}>
            <button className="search-button">Submit</button>
          </Link>
        </form>
      </div>
      <Navigation tab={'stocks'} />
      {data && data.length && <StockTable data={data} />}
    </main>
  );
}

import CryptoTable from "../dataTables/CryptoTable";
import useCryptoData from "../../hooks/useCryptoData";
import Navigation from "../Navigation";
import { useContext } from "react";
import { watchlistContext } from "../../providers/WatchlistProvider";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";



export default function CryptoDashboard(props) {
  const { watchlist } = useContext(watchlistContext);
  const [watchlistIds, setWatchlistIds] = useState([]);
  const { isLoading, user } = useAuth0();
  const [searchValue, setSearchValue] = useState("");

  const buildAPIUrl = (ids) => {
    const idString = ids && ids.length > 0 ? ids.join("%2C%20") : null;
    if (idString) {
      return `coins/markets?vs_currency=usd&ids=${idString}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C14d%2C30d`;
    }
    return null;
  };

  let watchlistApi = buildAPIUrl(watchlistIds);
  const { cryptoData } = useCryptoData(watchlist && watchlistApi ? watchlistApi : "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C14d%2C30d");

  const payload = user?.email;

  useEffect(() => {
    if (watchlistIds?.length === 0) {

      axios.get(`http://localhost:8080/getFavoritesCrypto?email=${payload}`)
        .then((result) => {
          const ids = result.data.CryptoFavorites.map(favorite => favorite.api_id);
          setWatchlistIds(ids);
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
  }, [watchlistIds, payload]);


  if (isLoading) {
    return null;
  };

  return (
    <main>
      <div>
        <h1>
          <strong>{watchlist ? 'Crypto Watchlist' : 'Top Crypto Currencies'}</strong>
        </h1>
        <form className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            onChange={event => setSearchValue(event.target.value)}
          />
          <Link to={`/crypto/${searchValue.replace(/\s+/g, '-').toLowerCase()}`}>&nbsp;
            <button className="search-button btn btn-outline-info"><i className="fa-solid fa-magnifying-glass"></i></button>
          </Link>
        </form>
      </div>

      <Navigation tab={"crypto"} />
      {cryptoData && <CryptoTable data={cryptoData} setWatchlistIds={setWatchlistIds} watchlistIds={watchlistIds} />}
    </main>
  );
};


import "../styles/HomepageButton2.scss"
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { watchlistContext } from "../providers/WatchlistProvider";


export default function Home(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { setWatchlist } = useContext(watchlistContext);

  useEffect(() => {
    axios.post('http://localhost:8080/users', user)
    .then(result => {
    })
  },[user])

    if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div>
        <h2>
          <strong>What are we tracking today Anon?</strong>
        </h2>
      </div>
      <div className="homepage-button-group">
        <Link to="stocks/dashboard" onClick={setWatchlist(false)} >Stocks</Link>
        <Link to="crypto/dashboard" onClick={setWatchlist(false)} >Crypto</Link>
        <Link to="nft/dashboard" onClick={setWatchlist(false)} >Nft</Link>
      </div>
    </>
  );
};
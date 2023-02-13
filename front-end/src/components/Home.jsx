import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { watchlistContext } from "../providers/WatchlistProvider";

//STYLES
import "../styles/HomepageButton2.scss"

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
      <h1 className="home-quote"><strong>WHAT ARE WE TRACKING TODAY ANON?</strong></h1>
      <div className="homepage-button-group">
        <Link to="stocks/dashboard" onClick={setWatchlist(false)} >Stocks</Link>
        <Link to="crypto/dashboard" onClick={setWatchlist(false)} >Crypto</Link>
        <Link to="nft/dashboard" onClick={setWatchlist(false)} >Nft</Link>
      </div>
    </>
  );
};
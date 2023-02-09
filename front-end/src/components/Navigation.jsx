import { Link } from "react-router-dom";
import classNames from "classnames";
import { useContext } from "react";
import { watchlistContext } from "../providers/WatchlistProvider";

export default function Navigation(props) {
  const { tab } = props;
  const { watchlistToggle, watchlist } = useContext(watchlistContext)

  const stockButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': tab === 'stocks' });
  const cryptoButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': tab === 'crypto' });
  const nftButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': tab === 'nft' });
  const watchlistButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': watchlist === true });
  

  return (
    <nav className="navbar navbar-light bg-dark">
      <div>
        <Link to="/stocks/dashboard">
          <button className={stockButton} type="button">
            Stocks
          </button>
        </Link>
        <Link to="/crypto/dashboard">
          <button className={cryptoButton} type="button">
            Crypto
          </button>
        </Link>
        <Link to="/nft/dashboard">
          <button className={nftButton} type="button">
            NFT's
          </button>
        </Link>
      </div>

      <div>
        <button className={watchlistButton} type="button" onClick={watchlistToggle}>
          Watchlist
        </button>
      </div>
    </nav>
  );
};

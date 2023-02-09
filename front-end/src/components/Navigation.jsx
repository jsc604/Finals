import { Link } from "react-router-dom";
import classNames from "classnames";

export default function Navigation(props) {
  const { toggle, tab, watchlistStatus } = props;

  const stockButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': tab === 'stocks' });
  const cryptoButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': tab === 'crypto' });
  const nftButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': tab === 'nft' });
  const watchlistButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': watchlistStatus === true });
  

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
        <button className={watchlistButton} type="button" onClick={() => toggle()}>
          Watchlist
        </button>
      </div>
    </nav>
  );
};

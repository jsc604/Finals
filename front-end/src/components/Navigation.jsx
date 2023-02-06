import { Link } from "react-router-dom";
import classNames from "classnames";

export default function Navigation(props) {

  const stockButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': props.tab === 'stocks' });
  const cryptoButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': props.tab === 'crypto' });
  const nftButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': props.tab === 'nft' });

  return (
    <nav className="navbar navbar-light bg-dark">
      <div>
        <button className={stockButton} type="button">
          <Link to="/stocks/dashboard">Stocks</Link>
        </button>
        <button className={cryptoButton} type="button">
          <Link to="/crypto/dashboard">Crypto</Link>
        </button>
        <button className={nftButton} type="button">
          <Link to="/nft/dashboard">NFT's</Link>
        </button>
      </div>

      <div>
        <button className="btn btn-outline-warning" type="button">
          Watchlist
        </button>
      </div>
    </nav>
  );
};

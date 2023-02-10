import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import CryptoSearch from "../hooks/useCryptoSearch";
import { useState } from 'react';


export default function Navigation(props) {
  const { toggle } = props;

  const stockButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': props.tab === 'stocks' });
  const cryptoButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': props.tab === 'crypto' });
  const nftButton = classNames('btn btn-outline-warning', { 'btn btn-outline-warning active': props.tab === 'nft' });
  const location = useLocation();

  const [searchValue, setSearchValue] = useState('');



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
        {/* <div>


          <form className="search-form">
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <button className="search-button" type="submit">Submit</button>
          </form>
        </div> */}


        <div>
          <button className="btn btn-outline-warning" type="button">
            Watchlist
          </button>
        </div>
      </nav>
    );
  };


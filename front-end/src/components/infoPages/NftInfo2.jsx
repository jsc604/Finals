import { useParams, Link } from "react-router-dom";
import useNftInfo from "../../hooks/useNftInfo";
import { useState, useEffect } from "react";
import "../../styles/nftInfo.scss";
import { formatNumber } from "../../helpers/table_helpers";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { watchlistContext } from "../../providers/WatchlistProvider";

export default function NftInfo2(props) {
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();
  const {user} = useAuth0();
  const {watchlist} = useContext(watchlistContext);

  const { nftInfo } = useNftInfo(id);

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:8080/checkIfFavorite', {
        params: {
          email: user.email,
          apiId: id,
          category: 'nft'
        }
      })
      .then(result => {
        setFavorite(result.data.isFavorite);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [id, user]);

  if (!nftInfo) {
    return <p>Loading....</p>;
  }

  const handleClick = () => {
    setFavorite(!favorite);
    const payload = {
      email: user.email,
      apiId: id,
      category: 'nft'
    }
    if (favorite) {
      axios.post('http://localhost:8080/favoriteDelete', payload)
        .then(result => {
          console.log('RESULT: ', result);
        })
        .catch(ex => {
          console.log(ex);
        });
    } else {
      axios.post('http://localhost:8080/favoriteInsert', payload)
        .then(result => {
          console.log('RESULT: ', result);
        })
        .catch(ex => {
          console.log(ex);
        });
    }
  };

  let nftInfoPage = nftInfo.map((nft) => {    
    return (
    <>
      <h1>{nft.name}</h1>

        <div>
          <div >Contract Address:</div>
          <div >{nft.contract_address}</div>
        </div>

        <div className="nav-buttons">
          <Link to="/nft/dashboard">
            <button className="btn btn-outline-warning">
              {watchlist? 'Back to Watchlist' : 'Back to Dashboard'}
            </button>
          </Link>
          <button className="btn btn-light" onClick={handleClick}>
            <i className={ favorite ? "fa-solid fa-star favorited" : "fa-regular fa-star"}></i> 
            Add to Watchlist
          </button>
        </div>

        <div className="top-container">
          <img src={nft.image.small} alt="logo" />
          <div className="category">
            <div className="category-type">Market Cap :</div>
            <div className="category-type">Floor Price :</div>
            <div className="category-type">Volume 24h :</div>
            <div className="category-type">Holders:</div>
            <div className="category-type">Holders Change %24h:</div>
            <div className="category-type">Total Supply:</div>
          </div>
          <div className="value">
            <div className="value-type">
              (<i className="fa-brands fa-ethereum"></i>){formatNumber(nft.market_cap.native_currency)}&nbsp; ~
              &nbsp;(USD) ${formatNumber(nft.market_cap.usd)}</div>
            <div className="value-type">
              (<i className="fa-brands fa-ethereum"></i>){formatNumber(nft.floor_price.native_currency)}&nbsp; ~
              &nbsp;(USD) ${formatNumber(nft.floor_price.usd)}</div>
            <div className="value-type">
              (<i className="fa-brands fa-ethereum"></i>){formatNumber(nft.volume_24h.native_currency)}&nbsp; ~
              &nbsp;(USD) ${formatNumber(nft.volume_24h.usd)}</div>
            <div className="value-type">{formatNumber(nft.number_of_unique_addresses)}</div>
            <div className="value-type">{formatNumber(nft.number_of_unique_addresses_24h_percentage_change)}</div>
            <div className="value-type">{formatNumber(nft.total_supply)}</div>
          </div>
        </div>

        <div className="description">
          {nft.description}
        </div>
      </>
      )});

  return (
    <div className="nft-infos">
      {nftInfoPage}
    </div>
  );
}

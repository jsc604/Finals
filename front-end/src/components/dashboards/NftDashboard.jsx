import NftTable from "../dataTables/NftTable";
import Navigation from "../Navigation";
import useNftData from "../../hooks/useNftData";
import { useContext } from "react";
import { watchlistContext } from "../../providers/WatchlistProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const topNftId = ['clonex', 'meebits', 'bored-ape-kennel-club', 'bored-ape-yacht-club', 'mutant-ape-yacht-club', 'cryptopunks', 'sandbox', 'decentraland', 'otherdeed-for-otherside', 'doodles-official', 'moonbirds'];

export default function NftDashboard(props) {
  const { watchlist } = useContext(watchlistContext);
  const [watchlistIds, setWatchlistIds] = useState([]);
  const { isLoading, user } = useAuth0();
  
  const payload = user?.email;
  
  useEffect(() => {
      
      axios.get(`http://localhost:8080/getFavoritesNFT?email=${payload}`)
      .then((result) => {
        const ids = result.data.NftFavorites.map(favorite => favorite.api_id);
        setWatchlistIds(ids);
      })
      .catch((ex) => {
        console.log(ex);
      });
    },[payload])
  
  const { nftData } = useNftData(watchlist ? watchlistIds : topNftId);
  
  if(isLoading) {
    return null;
  };
  return (
      <main>
        <h1><strong>{watchlist ? 'NFT Watchlist' : 'Top NFT Collections'}</strong></h1>
        <Navigation tab={'nft'} />
        { nftData && nftData.length !== 0 && <NftTable data={nftData} setWatchlistIds={setWatchlistIds} watchlistIds={watchlistIds} /> }
      </main>
  );
};
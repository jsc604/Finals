import NftTable from "../dataTables/NftTable";
import Navigation from "../Navigation";
import useNftData from "../../hooks/useNftData";
import { useContext } from "react";
import { watchlistContext } from "../../providers/WatchlistProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


export default function NftDashboard(props) {
  const { watchlist } = useContext(watchlistContext);
  const [watchlistIds, setWatchlistIds] = useState([]);
  const { isLoading, user } = useAuth0();

  const topNftId = ['clonex', 'meebits', 'bored-ape-kennel-club', 'bored-ape-yacht-club', 'mutant-ape-yacht-club', 'cryptopunks', 'sandbox', 'decentraland', 'otherdeed-for-otherside', 'doodles-official', 'moonbirds'];
  // const watchlistNftId = ['clonex', 'bored-ape-yacht-club'];
  const payload = user?.email;
  
  useEffect(() => {
    if (watchlistIds?.length === 0) {
      
      axios.get(`http://localhost:8080/getFavoritesNFT?email=${payload}`)
      .then((result) => {
        const ids = result.data.NftFavorites.map(favorite => favorite.api_id);
        console.log('----- NFT ids-----', ids);
        setWatchlistIds(ids);
        console.log('NFT DATA: ', nftData)  
      })
      .catch((ex) => {
        console.log(ex);
      });
    }
  },[watchlistIds])
  
  
  const topNftApiUrl = topNftId.map((id) => axios.get(`https://api.coingecko.com/api/v3/nfts/${id}`));
  const watchlistNftApiUrl = watchlistIds.map((id) => axios.get(`https://api.coingecko.com/api/v3/nfts/${id}`));

  const { nftData } = useNftData(watchlist ? watchlistNftApiUrl : topNftApiUrl);
  
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
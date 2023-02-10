import NftTable from "../dataTables/NftTable";
import Navigation from "../Navigation";
import useNftData from "../../hooks/useNftData";
import { useContext } from "react";
import { watchlistContext } from "../../providers/WatchlistProvider";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function NftDashboard(props) {
  const { watchlist } = useContext(watchlistContext);
  const { watchlistparam } = useParams();
  
  console.log('watchlist Param---', watchlistparam);

  const topNftId = ['clonex', 'meebits', 'bored-ape-kennel-club', 'bored-ape-yacht-club', 'mutant-ape-yacht-club', 'cryptopunks', 'sandbox', 'decentraland', 'otherdeed-for-otherside', 'doodles-official', 'moonbirds'];
  const watchlistNftId = ['clonex', 'bored-ape-yacht-club'];

  const topNftApiUrl = topNftId.map((id) => axios.get(`https://api.coingecko.com/api/v3/nfts/${id}`));
  const watchlistNftApiUrl = watchlistNftId.map((id) => axios.get(`https://api.coingecko.com/api/v3/nfts/${id}`));

  const { nftData } = useNftData(watchlist ? watchlistNftApiUrl : topNftApiUrl);
  
  return (
      <main>
        <h1><strong>{watchlist ? 'NFT Watchlist' : 'Top NFT Collections'}</strong></h1>
        <Navigation tab={'nft'} />
        { nftData && nftData.length !== 0 && <NftTable data={nftData} /> }
      </main>
  );
};
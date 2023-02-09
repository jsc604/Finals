import NftTable from "../dataTables/NftTable";
import Navigation from "../Navigation";
import useNftData from "../../hooks/useNftData";


// export default function NftDashboard(props) {
//   const { nftData } = useNftData();
//   return (
//     <main>
//       <h1><strong>Top NFT Collections</strong></h1>
//       <Navigation tab={'nft'} />
//       { nftData && nftData.length !== 0 && <NftTable data={nftData} /> }
//     </main>
//   );
// };

import { useState, useEffect } from 'react';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function NftDashboard(props) {
  const { nftData } = useNftData('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'); 
  const [favoriteData, setFavoriteData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const {user} = useAuth0();
  const [dataSource, setDataSource] = useState('nftData')

  const handleClick = () => {
    if (dataSource === 'favoriteData') {
      return setDataSource('nftData')
    }
    const payload = user.email;
    // console.log('PAYLOAD: ', payload)
    axios.get(`http://localhost:8080/getFavoritesNft?email=${payload}`)
      .then(result => {
        setFavorites(result.data.favorites);
 
      })
      .catch(ex => {
        console.log(ex);
      })
  }

  useEffect(() => {
      if(favorites.length > 0) {
        const fetchData = async () => {
          const ids = favorites.map(favorite => favorite.api_id).join(",");
          const response = await axios.get("axios.get(https://api.coingecko.com/api/v3/nfts/${ids})");
          setFavoriteData(response.data);
          setDataSource('favoriteData')
          console.log('FAVORITE DATA : ', response.data)
        };
        fetchData()
      }
  }, [favorites]);
    

  return (
    <main>
      <h1><strong>Top NFT Currencies</strong></h1>
      <Navigation tab={'nft'} favorites={favorites} handleClick={handleClick}  />

    {nftData && < NftTable data={dataSource === 'nftData' ? nftData : favoriteData} />}

    </main>
  );
};

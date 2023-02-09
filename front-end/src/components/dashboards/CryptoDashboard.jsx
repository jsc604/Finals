import CryptoTable from "../dataTables/CryptoTable";
import useCryptoData from "../../hooks/useCryptoData";
import Navigation from "../Navigation";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function CryptoDashboard(props) {
  const { cryptoData } = useCryptoData('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'); 
  const [favoriteData, setFavoriteData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const {user} = useAuth0();
  const [dataSource, setDataSource] = useState('cryptoData')

  const handleClick = () => {
    if (dataSource === 'favoriteData') {
      return setDataSource('cryptoData')
    }
    const payload = user.email;
    // console.log('PAYLOAD: ', payload)
    axios.get(`http://localhost:8080/getFavoritesCrypto?email=${payload}`)
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
          const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" + ids + "&order=market_cap_desc&per_page=100&page=1&sparkline=false");
          setFavoriteData(response.data);
          setDataSource('favoriteData')
          console.log('FAVORITE DATA : ', response.data)
        };
        fetchData()
      }
  }, [favorites]);
    

  return (
    <main>
      <h1><strong>Top Crypto Currencies</strong></h1>
      <Navigation tab={'crypto'} favorites={favorites} handleClick={handleClick}  />

    {cryptoData && < CryptoTable data={dataSource === 'cryptoData' ? cryptoData : favoriteData} />}

    </main>
  );
};

import { useState, useEffect } from 'react';
import axios from 'axios';


export default function useNftInfo(id) {
  const [nftInfo, setNftInfo] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    let cancel = false;
    setNftInfo([]);

    axios.get(`https://api.coingecko.com/api/v3/nfts/${id}`)
    .then(response => {
      if (!cancel) {
        setLoading(true);
        setNftInfo(response.data);
      }
    })
    .catch(error => setError(error))
    .finally(() => setLoading(false));

    return () => cancel = true;
  }, [id])

  console.log('-----nft info------', nftInfo);
  return { error, loading, nftInfo };
}

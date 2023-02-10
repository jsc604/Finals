import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { watchlistContext } from '../providers/WatchlistProvider';

export default function useCryptoData(param) {
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { watchlist } = useContext(watchlistContext);

  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3'; 

  useEffect(() => {
    let cancel = false;
    setCryptoData(null);
    axios.get(param)
      .then(response => {
        if (!cancel) {
          setLoading(true);
          setCryptoData(response.data);
        }
      })
      .catch(error => {setError(error);})
      .finally(() => {setLoading(false);});

    return () => {
      cancel = true;
    };
  }, [param, watchlist]);

  return { error, loading, cryptoData };
}
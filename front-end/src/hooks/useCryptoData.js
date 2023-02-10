import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCryptoData(param) {
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3'; 

  useEffect(() => {
    let cancel = false;

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
  }, [param]);

  return { error, loading, cryptoData };
}
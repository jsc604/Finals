import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CryptoSearch(search) {
  const [cryptoSearch, setCryptoSearch] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3';

  useEffect(() => {
    let cancel = false;

    axios.get(search)
      .then(response => {
        console.log(response);
        if (!cancel) {
          setCryptoSearch(response.data);
          setLoading(false);
        }
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [search]);

  return { cryptoSearch, loading, error };
}




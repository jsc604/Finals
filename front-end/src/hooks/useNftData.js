import { useState, useEffect, useContext } from 'react';
import { watchlistContext } from '../providers/WatchlistProvider';

export default function useNftData(requests) {
  const [nftData, setNftData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { watchlist } = useContext(watchlistContext)

  useEffect(() => {
    let cancel = false;

    setLoading(true);
    setNftData([]);

    Promise.all(requests)
      .then(responses => {
        if (!cancel) {
          console.log('RESPONSES:', responses)
          const data = responses.map(response => {
            if (response.data.error) {
              throw new Error(response.data.error);
            }
            return response.data;
          });
          setNftData(data);
        }
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      cancel = true;
    };
  }, [requests, watchlist]);

  return { error, loading, nftData };
}

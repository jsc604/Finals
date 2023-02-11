import { useState, useEffect } from 'react';
import axios from 'axios';


export default function useNftData(array) {
  const [nftData, setNftData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    let cancel = false;

    const request = array.map((id) => axios.get(`https://api.coingecko.com/api/v3/nfts/${id}`))
   
    setLoading(true);
    setNftData([]);

    Promise.all(request)
      .then(responses => {
        console.log('PROMISE DOT ALL');
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
  }, [array]);

  return { error, loading, nftData };
}

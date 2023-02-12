import { useState, useEffect } from 'react';
import axios from 'axios';


export default function useNftData(array) {
  const [nftData, setNftData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const topNftId = ['clonex', 'meebits', 'bored-ape-kennel-club', 'bored-ape-yacht-club', 'mutant-ape-yacht-club', 'cryptopunks', 'sandbox', 'decentraland', 'otherdeed-for-otherside', 'doodles-official', 'moonbirds'];

  useEffect(() => {
    let cancel = false;

    const request = array.map((id) => axios.get(`https://api.coingecko.com/api/v3/nfts/${id}`))
   
    setLoading(true);
    setNftData([]);

    const requests = topNftId.map((id) => 
      axios.get(`https://api.coingecko.com/api/v3/nfts/${id}`)
    );

    Promise.all(requests)
      .then(responses => {
        if (!cancel) {
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

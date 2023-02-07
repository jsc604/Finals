import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useNftData() {
  const [nftData, setNftData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const topNftId = ['clonex', 'meebits', 'bored-ape-kennel-club', 'bored-ape-yacht-club', 'mutant-ape-yacht-club', 'cryptopunks', 'sandbox', 'decentraland', 'otherdeed-for-otherside', 'doodles-official', 'moonbirds'];

  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3/nfts/'; 

  useEffect(() => {
    let cancel = false;

    setLoading(true);

    const requests = topNftId.map((id) => axios.get(`${id}`));

    Promise.all(requests)
      .then(responses => {
        if (!cancel) {
          setNftData(responses.map(response => response.data));
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
    //eslint-disable-next-line
  }, []);

  return { error, loading, nftData };
}

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useStockInformationSingleCall(stock) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);

    setData([]);
    const options = {
      method: 'GET',
      url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${stock}/asset-profile`,
      params: { diffandsplits: 'false' },
      headers: {
        'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
        'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
      }
    }


    axios.request(options)
      .then(response => {
        const dataArray = Object.values(response.data);
        setData(dataArray);
      })
      .catch(error => {
        console.error("Error: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [stock]);

  const result = { error, loading, data };

  return result;
}
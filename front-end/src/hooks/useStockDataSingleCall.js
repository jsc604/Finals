import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useStockDataSingleCall(stock) {
  const [dataFromStocks, setDataFromStocks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);

    setDataFromStocks([]);
    const options = {
      method: 'GET',
      url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${stock}/15m`,
      params: { diffandsplits: 'false' },
      headers: {
        'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
        'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
      }
    }

    axios.request(options)
      .then(response => {
        // console.log('---response----', [response.data])
        const dataArray = Object.values(response.data);
        setDataFromStocks(dataArray);
      })
      .catch(error => {
        console.error("Error: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [stock]);

  const result = { error, loading, dataFromStocks };

  return result;
}
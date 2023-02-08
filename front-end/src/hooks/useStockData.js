import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useStockData() {
  const [stockData, setStockData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const stockArray = ['AAPL', 'TSLA', 'MSFT', 'ARKK', 'KO'];

  useEffect(() => {
    let cancel = false;

    const setLoading = true;

    const promises = stockArray.map(stock => {
      const options = {
        method: 'GET',
        url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${stock}/15m`,
        params: {diffandsplits: 'false'},
        headers: {
          'X-RapidAPI-Key': '40795b65damshafd9b9de5c7f76bp134526jsn5a3d2446df9c',
          'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
      };

      return axios.request(options)
        .then(response => ({
          [stock]: response.data
        }))
        .catch(error => {
          console.error(error);
        });
    });

    Promise.all(promises)
      .then(responses => {
        setStockData(prev => ({
          ...prev,
          ...responses.reduce((acc, response) => ({ ...acc, ...response }), {})
        }))
      });
      return() => {
        cancel = true;
      }
  }, []);

  const result = { error, loading, stockData }
  console.log("result", result)
  return result;
};


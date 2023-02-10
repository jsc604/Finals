import { useState, useEffect } from 'react';
import percentChangedHelper from '../helpers/percentChange';
import axios from 'axios';
import { formatNumber } from "../helpers/table_helpers";

export default function StockData(interval) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const stockArray = ['AAPL', 'TSLA', 'MSFT', 'ARKK', 'KO'];
  // const [interval, setInterval] = useState('1d');

  axios.defaults.baseURL = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history'; 

  useEffect(() => {
    let cancel = false;

    setLoading(true);

    const promises = stockArray.map(stock => {
      const options = {
        method: 'GET',
        url: `/${stock}/15m`,
        params: { diffandsplits: 'false' },
        headers: {
          'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
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
        
        
        setData(responses.map(stockObj => {
          console.log("LOGGING HEERE", stockObj)
          const container = Object.values(stockObj)[0];
          
          return { ...container.meta, items: container.items, percentageChange: formatNumber(percentChangedHelper(container.meta.previousClose, container.meta.regularMarketPrice)) };
        }
        ));
      });
    return () => {
      cancel = true;
    };
  }, []);


console.log('--------', data);
  const result = { error, loading, data };

  return result;
};
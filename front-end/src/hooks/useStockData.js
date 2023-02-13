import { useState, useEffect } from 'react';
import percentChangedHelper from '../helpers/percentChange';
import axios from 'axios';
import { formatNumber } from "../helpers/table_helpers";

export default function useStockData(array) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancel = false;
    setData([]);
    setLoading(true);

    if (array) {
      const fetchData = async () => {
        const promises = array.map(async stock => {
          const options = {
            method: 'GET',
            url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${stock}/15m`,
            params: { diffandsplits: 'false' },
            headers: {
              'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
              'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
            }
          };
          
          try {
            const response = await axios.request(options);
            return {
              [stock]: response.data
            };
          } catch (error) {
            console.error(error);
          }
        });
  
        const responses = await Promise.all(promises);
        if (!cancel) {
          setData(responses.map(stockObj => {
            const container = Object.values(stockObj)[0];
            
            return { ...container.meta, items: container.items, percentageChange: formatNumber(percentChangedHelper(container.meta.previousClose, container.meta.regularMarketPrice)) };
          }
          ));
        }
      };
      fetchData();
    }
    return () => {
      cancel = true;
    };
  }, [array]);

  const result = data ? data : [];

  return {error, loading, result};
};
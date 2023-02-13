import { useState, useEffect } from 'react';
import percentChangedHelper from '../helpers/percentChange';
import axios from 'axios';
import { formatNumber } from "../helpers/table_helpers";

export default function useStockChartData(stock) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setData([]);
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
        const dataArray = Object.values(response.data);
        console.log("Data Array: ", dataArray);
        setData(dataArray);
      })
      .catch(error => {
        console.error("Error: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const result = { error, loading, data };

  return result;
}
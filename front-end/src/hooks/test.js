import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Test() {
  const [data, setData] = useState({});
  const stockArray = ['AAPL', 'TSLA', 'MSFT', 'ARKK', 'KO'];

  useEffect(() => {
    stockArray.forEach(stock => {
      const options = {
        method: 'GET',
        url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${stock}/15m`,
        params: {diffandsplits: 'false'},
        headers: {
          'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
          'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
      };

      axios.request(options)
        .then(response => {
          setData(prev => ({
            ...prev,
            [stock]: response.data
          }));
        })
        .catch(error => {
          console.error(error);
        });
    });
  }, []);

  return (
    <div>
      { Object.keys(data).length !== 0 ? <p>Data received: {JSON.stringify(data)}</p> : <p>Loading...</p> }
    </div>
  );
};

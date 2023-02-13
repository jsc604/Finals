import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useStockInformation() {
  const [stockInfoData, setStockInfoData] = useState([]);
  const stockArray = ['AAPL', 'TSLA', 'MSFT', 'ARKK', 'KO'];

  useEffect(() => {
    let cancel = false;

    const requests = stockArray.map(stock => {
      const options = {
        method: 'GET',
        url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${stock}/asset-profile`,
        params: {diffandsplits: 'false'},
        headers: {
          'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
          'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
      };

      return axios.request(options)
        .then(response => response.data)
        .catch(error => {
          console.error(error);
        });
    });

    Promise.all(requests)
      .then(responses => {
        setStockInfoData(responses.map(stockInfoObj => {
          const container = Object.values(stockInfoObj)[0];
            return { ...container };
          }
          ));
      });
    return() => {
      cancel = true;
    }
  }, []);

  return { stockInfoData };
};
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Test() {
//   const [stockInfoData, setStockInfoData] = useState([]);
//   const stockArray = ['AAPL', 'TSLA', 'MSFT', 'ARKK', 'KO'];

//   axios.defaults.baseURL = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote'; 

//   useEffect(() => {
//     let cancel = false;

//     const requests = stockArray.map(stock => {
//       const options = {
//         method: 'GET',
//         url: `/${stock}/asset-profile`,
//         params: {diffandsplits: 'false'},
//         headers: {
//           'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
//           'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
//         }
//       };

//       return axios.request(options)
//         .then(response => response.stockInfoData)
//         .catch(error => {
//           console.error(error);
//         });
//     });

//     Promise.all(requests)
//       .then(responses => {

//         console.log(responses);
//         setStockInfoData(responses.map(infoObj => {
//           const container = Object.values(infoObj[0])

//           return { ...container}
//         }));
//       })
//       return() => {
//         cancel = true;
//       }
//   }, []);

//   console.log("StockInfo Data is: ", stockInfoData)

//   return { stockInfoData }
// };

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function StockInformation() {
  const [stockInfoData, setStockInfoData] = useState([]);
  const stockArray = ['AAPL', 'TSLA', 'MSFT', 'ARKK', 'KO'];

  let cancel = false;

  axios.defaults.baseURL = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote';

  useEffect(() => {
    const requests = stockArray.map(stock => {
      const options = {
        method: 'GET',
         url: `/${stock}/asset-profile`,
        params: {diffandsplits: 'false'},
        headers: {
          'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
          'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
      };
      return axios.request(options)
      .then(response => response.stockInfoData)
      .catch(error => {
        console.error(error);
      });
  });

  Promise.all(requests)
    .then(responses => {
      console.log("line 82 usestockinfo", responses);
      setStockInfoData(responses.map(stockInfo => {
        const container = Object.values(stockInfo)[0];

        return { ...container}
      }))
    })
    return () => {
      cancel = true;
    };
}, []);

console.log("StockInfo Data is: ", stockInfoData)

return { stockInfoData }


};
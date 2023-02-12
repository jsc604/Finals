// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function useStockInformation() {
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
  console.log("________________")
  console.log("StockInfo Data is: LINE 90", stockInfoData)

  return { stockInfoData };
};

// import axios from 'axios';

// export default function useStockInformation() {
//   const [stockInfoData, setStockInfoData] = useState([]);

//   let cancel = false;
  

//   //axios.defaults.baseURL = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/'; 

//   //https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL/asset-profile - rapid API
//   //https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history - base URL

//   useEffect(() => {

//   const options = {
//     method: 'GET',
//     url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL/asset-profile',
//     params: {diffandsplits: 'false'},
//     headers: {
//       'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
//       'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
//     }
//   };

//   axios.request(options)
//     .then(response => {
//       console.log("Dominic Call response data", response)
//       setStockInfoData([response.data]);
//     })
//     .catch(error => {
//       console.error(error);
//     });
//         return() => {
//       cancel = true;
//     }
//   }, []);

//   console.log("StockInfo Data is: LINE 34", stockInfoData)

//   return { stockInfoData };
// };
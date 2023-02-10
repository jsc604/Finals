// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Test() {
//   const [data, setData] = useState([]);
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
//         .then(response => response.data)
//         .catch(error => {
//           console.error(error);
//         });
//     });

//     Promise.all(requests)
//       .then(responses => {

//         console.log(responses);
//         setData(responses.map(infoObj => {
//           const container = Object.values(infoObj[0])

//           return { ...container}
//         }));
//       })
//       return() => {
//         cancel = true;
//       }
//   }, []);

//   console.log("StockInfo Data is: ", data)

//   return { data }
// };

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Test() {
  const [data, setData] = useState([]);
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
      .then(response => response.data)
      .catch(error => {
        console.error(error);
      });
  });

  Promise.all(requests)
    .then(responses => {
      console.log("line 82 usestockinfo", responses);
      setData(responses.map(stockInfo => {
        const container = Object.values(stockInfo)[0];

        return { ...container}
      }))
    })
    return () => {
      cancel = true;
    };
}, []);

console.log('stockinfo data is: ', data)


};
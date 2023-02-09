// // import { useState, useEffect } from 'react';
// // import axios from 'axios';

// // export default function Test() {
// //   const [data, setData] = useState({});
// //   const stockArray = ['AAPL', 'TSLA', 'MSFT', 'ARKK', 'KO'];

// //   useEffect(() => {
// //     stockArray.forEach(stock => {
// //       const options = {
// //         method: 'GET',
// //         url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${stock}/asset-profile`,
// //         params: {diffandsplits: 'false'},
// //         headers: {
// //           'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
// //           'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
// //         }
// //       };

// //       axios.request(options)
// //         .then(response => {
// //           setData(prev => ({
// //             ...prev,
// //             [stock]: response.data
// //           }));
// //           console.log("data", response.data)
// //         })
// //         .catch(error => {
// //           console.error(error);
// //         });
// //     });
// //   }, []);

  

// //   return (
// //     <div>
// //       { Object.keys(data).length !== 0 ? <p>Data received: {JSON.stringify(data)}</p> : <p>Loading...</p> }
// //     </div>
// //   );
// // };

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Test() {
//   const [data, setData] = useState([]);
//   const stockArray = ['AAPL', 'TSLA', 'MSFT', 'ARKK', 'KO'];

//   useEffect(() => {
//     const requests = stockArray.map(stock => {
//       const options = {
//         method: 'GET',
//         url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${stock}/asset-profile`,
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
//         setData(responses)
//       })
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div>
//       { data.length !== 0 ? <p>Data received: {JSON.stringify(data)}</p> : <p>Loading...</p> }
//     </div>
//   );
// };

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Test() {
  const [data, setData] = useState([]);
  const stockArray = ['AAPL', 'TSLA', 'MSFT', 'ARKK', 'KO'];

  useEffect(() => {
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
        console.log(responses);
        setData(responses)
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      { data.length !== 0 ? <p>Data received: {JSON.stringify(data)}</p> : <p>Loading...</p> }
    </div>
  );
};
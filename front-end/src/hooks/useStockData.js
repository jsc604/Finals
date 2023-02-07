// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function useStockData() {
//   const [useStockData, setStockData] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const stockArray = ['Apple', 'IBM', 'Microsof'];

//   useEffect(() => {
//     let cancel = false;

//     setLoading(true);

//     const requests = stockArray.map((stock) => axios.request({
//       method: 'GET',
//       url: 'https://real-time-finance-data.p.rapidapi.com/search',
//       params: {query: stock},
//       headers: {
//         'X-RapidAPI-Key': '5f256936efmshf8eff84aba61fcap167b2djsnd9381c53a634',
//         'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
//       }
//     }));

//     Promise.all(requests)
//       .then(responses => {
//         if (!cancel) {
//           setStockData(responses.map(response => response.data));
//         }
//       })
//       .catch(error => {
//         setError(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });

//     return () => {
//       cancel = true;
//     };
//   }, []);

//   return { error, loading, useStockData };
// }

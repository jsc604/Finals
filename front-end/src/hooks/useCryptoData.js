import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCryptoData(param) {
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3'; 

  useEffect(() => {
    let cancel = false;

    axios.get(param)
      .then(response => {
        if (!cancel) {
          setLoading(true);
          setCryptoData(response.data);
        }
      })
      .catch(error => {setError(error);})
      .finally(() => {setLoading(false);});

    return () => {
      cancel = true;
    };
  }, [param]);

  return { error, loading, cryptoData };
}


// export default function useNFTdata(collectionName) {
//   const [nftData, setNftData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`https://api.coingecko.com/api/v3/nfts/${collectionName}`)
//       .then(response => {
//         setNftData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <p>Loading...</p>
//         </header>
//       </div>
//     );
//   }

//   return {nftData, error, loading}
// }

// export default function useCryptoData() {
//   const [cryptoData, setCryptoData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=canto&order=market_cap_desc&per_page=100&page=1&sparkline=false')
//       .then(response => {
//         setCryptoData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>Loading...</p>
//         </header>
//       </div>
//     );
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         {error ? <p>{error.toString()}</p> : <p>{JSON.stringify(cryptoData)}</p>}
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default function useStockData() {
//   const [stockData, setStockData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`https://www.alphavantage.co/query?function=${GLOBAL_QUOTE}&symbol=${IBM}&interval=5min&apikey=${demo}`)
//     // ^ `function` = data type
//     // ^^ `symbol = specific symbol
//     // ^^^ `interval` = time interval
//     // ^^^^ `apikey` = one for our api-key
//       .then(response => {
//         setStockData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>Loading...</p>
//         </header>
//       </div>
//     );
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         {error ? <p>{error.toString()}</p> : <p>{JSON.stringify(stockData)}</p>}
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


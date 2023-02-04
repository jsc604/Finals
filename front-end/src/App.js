import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './styles/app.scss';
// import axios from 'axios';
// import handleSubmit from './helpers/handleSubmit';
// import handleChange from './helpers/handleChange';
// import Form from './components/Form';


//SEARCHES FOR CRYPTO DATA
import CallCrypto from './components/CallCryptoData'; 
// SEARCHES FOR MOST POPULAR NFTS
import CallNFT from './components/CallNFTData'; 
// MATCHES CALLNFT API CONTRACT ADDRESS WITH FLOOR API CONTRACT ADDRESS TO DISPLAY FLOOR PRICE AND OTHER METRICS
import CallNFTFloor from './components/CallNFTFloorPrice' 
// CALLS STOCK API PER TICKER
import CallStocks from './components/CallStockData'

function App() {
  return (
    <div>
      <CallCrypto /> 
      <CallNFT />
      <CallNFTFloor />
      <CallStocks />
    </div>
  );
}

export default App;

// export default function App() {
//   const [cryptoData, setCryptoData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=canto&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
//       .then(response => {
//         setCryptoData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   const handlingInput = (event) => {
//     handleChange(event, formData, setFormData);
//   };

//   const handlingSubmission = (eventTest) => {
//     handleSubmit(eventTest, setLoading, formData, setCryptoData);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         {error ? <p>{error.toString()}</p> :
//           <div>
//             {cryptoData ? <p>{cryptoData[0].symbol.toUpperCase()}: ${cryptoData[0].current_price < 1000 ? cryptoData[0].current_price.toFixed(2) : cryptoData[0].current_price}</p> : null}
//           </div>
//         }
//         <Form formData={formData} handleChange={handlingInput} handleSubmit={handlingSubmission} />
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

// import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './styles/app.scss';
// import axios from 'axios';

// export default function App() {
//   const [contractsData, setContractsData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`https://api.nftport.xyz/v0/contracts/top?page_size=10&page_number=1&period=24h&order_by=volume&chain=ethereum&chain=polygon`, {
//       headers: {
//         Authorization: 'f5f07efc-050b-4666-a24b-4dee60ab7688',
//         'accept': 'application/json'
//       }
//     })
//       .then(response => {
//         setContractsData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         {error ? <p>{error.toString()}</p> :
//           <div>
//             {contractsData ? <p>{contractsData.contracts[0].name}</p> : null}
//           </div>
//         }
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


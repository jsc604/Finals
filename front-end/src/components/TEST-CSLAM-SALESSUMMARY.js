// import React, { useState, useEffect } from 'react';
// import logo from '../logo.svg';
// import '../styles/app.scss';
// import axios from 'axios';

// export default function SalesSummary() {
//   const [contractsData, setContractsData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`https://api.cryptoslam.io/dhcugckmn134lzcp/v1/collections/${collectionId}/sales-summary`, {
//       headers: {
//         'X-BLOBR-KEY': 'EMWda4itaSmFyrGOsQhNR11RPPS7h5ib',
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
//             {contractsData ? <p>{contractsData ? <p>{JSON.stringify(contractsData)}</p> : null}</p> : null}
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
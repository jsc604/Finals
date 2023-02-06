import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../styles/app.scss';
import axios from 'axios';
import filteredData from '../helpers/filteredData';

export default function Top100NFT() {
  const [contractsData, setContractsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.cryptoslam.io/9vtih9mrf0giktml/v1/collections/top-100?timeRange=day`, {
      headers: {
        'X-BLOBR-KEY': 'EMWda4itaSmFyrGOsQhNR11RPPS7h5ib',
        'accept': 'application/json'
      }
    })
      .then(response => {
        const filtered = filteredData(response.data.data, 1, 10);
        setContractsData(filtered);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error ? <p>{error.toString()}</p> :
          <div>
            {contractsData ? <p>{contractsData ? <p>{JSON.stringify(contractsData)}</p> : null}</p> : null}
          </div>
        }
        {error ? <p>{error.toString()}</p> :
          <div>
            {contractsData ? <p>{contractsData.map(data => data.collectionId)}</p> : null}
          </div>
        }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
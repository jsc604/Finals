import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../styles/app.scss';
import axios from 'axios';

export default function CallNFTFloor() {
  const [contractsData, setContractsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.nftport.xyz/v0/transactions/stats/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d?chain=ethereum`, {
      headers: {
        Authorization: 'f5f07efc-050b-4666-a24b-4dee60ab7688',
        'accept': 'application/json'
      }
    })
      .then(response => {
        setContractsData(response.data);
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
            {contractsData ? <p>{contractsData.statistics.floor_price}</p> : null}
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
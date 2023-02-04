import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../styles/app.scss';
import axios from 'axios';

export default function CallNFT() {
  const [contractsData, setContractsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.nftport.xyz/v0/contracts/top?page_size=10&page_number=1&period=24h&order_by=volume&chain=ethereum&chain=polygon`, {
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
            {contractsData ? <p>{contractsData.contracts[0].name}</p> : null}
          </div>
        }
        {error ? <p>{error.toString()}</p> :
          <div>
            {contractsData ? <p>{contractsData.contracts[0].contract_address}</p> : null}
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

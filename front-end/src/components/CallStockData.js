import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../styles/app.scss';
import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://real-time-finance-data.p.rapidapi.com/search',
  params: { query: 'Apple' },
  headers: {
    'X-RapidAPI-Key': '5f256936efmshf8eff84aba61fcap167b2djsnd9381c53a634',
    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
  }
};

export default function CallStocks() {
  const [contractsData, setContractsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.request(options)
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
            {contractsData ? <p>{JSON.stringify(contractsData)}</p> : null}
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

//2WVKJB3QIOIH3NND
import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../styles/app.scss';
import axios from 'axios';
import handleSubmit from '../helpers/handleSubmit';
import handleChange from '../helpers/handleChange';
import Form from '../components/Form';

export default function CallCrypto() {
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=canto&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(response => {
        setCryptoData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handlingInput = (event) => {
    handleChange(event, formData, setFormData);
  };

  const handlingSubmission = (eventTest) => {
    handleSubmit(eventTest, setLoading, formData, setCryptoData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {error ? <p>{error.toString()}</p> :
          <div>
            {cryptoData ? <p>{cryptoData[0].symbol.toUpperCase()}: ${cryptoData[0].current_price < 1000 ? cryptoData[0].current_price.toFixed(2) : cryptoData[0].current_price}</p> : null}
          </div>
        }
        <Form formData={formData} handleChange={handlingInput} handleSubmit={handlingSubmission} />
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
import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../styles/app.scss';
import axios from 'axios';
import handleSubmit from '../helpers/handleSubmit';
import handleChange from '../helpers/handleChange';
import Form from '../components/Form';

export default function CallCrypto() {
  const axios = require("axios");

  const options = {
    method: 'GET',
    url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL/asset-profile',
    headers: {
      'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
      'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
    }
  };

  axios.request(options).then(function(response) {
    console.log(response.data);
  }).catch(function(error) {
    console.error(error);
  });
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


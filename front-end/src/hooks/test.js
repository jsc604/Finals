import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../styles/app.scss';
import axios from 'axios';

const Test = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL/asset-profile',
      headers: {
        'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
        'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
      }
    };
    axios
      .request(options)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError(error);
      });

    axios
      .request(options)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);
  console.log(data);

return (

  <div className="App">
    
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {error ? <p>{error.toString()}</p> :
        <div>
          {data ? <p>{data}</p> : null}
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

export default Test;


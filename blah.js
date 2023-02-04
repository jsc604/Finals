const axios = require('axios');

const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo';

axios.get(url, { headers: { '2WVKJBQIOIH3NND': 'axios' } })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
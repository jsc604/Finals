// import { useState, useEffect } from 'react';
// import percentChangedHelper from '../helpers/percentChange';
// import axios from 'axios';
// import { formatNumber } from "../helpers/table_helpers";

// export default function useStockChartData(stock) {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const stockArray = ['AAPL', 'TSLA', 'MSFT', 'ARKK', 'KO'];
//   // const [interval, setInterval] = useState('1d');

//   axios.defaults.baseURL = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history';

//   useEffect(() => {
//     let cancel = false;

//     setLoading(true);
//     setData([]);
//     const options = {
//       method: 'GET',
//       url: `/${stock}/15m`,
//       params: { diffandsplits: 'false' },
//       headers: {
//         'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
//         'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
//       }
//     };

//     axios.request(options)
//       .then(response => {
//         const dataArray = Object.values(response.data);
//         setData(dataArray);
//         console.log('-----api called----- ');
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   const result = { error, loading, data };

//   // console.log("RESULT FROM STOCKCHARTHOOK: ", data )

//   console.log("RESULT FROM STOCKCHARTHOOK: ", data);

//   return result;
// }

import { useState, useEffect } from 'react';
import percentChangedHelper from '../helpers/percentChange';
import axios from 'axios';
import { formatNumber } from "../helpers/table_helpers";

export default function useStockChartData(stock) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const stockArray = ['AAPL', 'TSLA', 'MSFT', 'ARKK', 'KO'];
  // const [interval, setInterval] = useState('1d');

  axios.defaults.baseURL = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history';

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    setData([]);
    const options = {
      method: 'GET',
      url: `/${stock}/1d`,
      params: { diffandsplits: 'false' },
      headers: {
        'X-RapidAPI-Key': '7b5da849a9mshd5f86de579f0f1bp100542jsn7b2f59e7343d',
        'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
      }
    }

    axios.request(options)
      .then(response => {
        const dataArray = Object.values(response.data);
        console.log("Data Array: ", dataArray);
        setData(dataArray);
        // setData(response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const result = { error, loading, data };

  console.log("Data: ", data);

  return result;
}
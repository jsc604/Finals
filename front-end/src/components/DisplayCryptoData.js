import React from 'react';

// const DisplayData = ({ cryptoData }) => {
//   return (
//     <div>
//       {cryptoData ? (
//         <p>
//           {cryptoData[0].symbol.toUpperCase()}: $
//           {cryptoData[0].current_price < 1000
//             ? cryptoData[0].current_price.toFixed(2)
//             : cryptoData[0].current_price}
//         </p>
//       ) : null}
//     </div>
//   );
// };



const DisplayData = ({ cryptoData, loading }) => {
  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && !cryptoData && <p>No Data Found</p>}
      {!loading && cryptoData && (
        <div>
          <p>{cryptoData[0].symbol.toUpperCase()}: $
          {cryptoData[0].current_price < 1000 
          ? cryptoData[0].current_price.toFixed(2) 
          : cryptoData[0].current_price}</p>
        </div>
      )}
    </div>
  );
};

export default DisplayData;
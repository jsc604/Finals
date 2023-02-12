


// The size of my chart in stockInfo is tiny, the size of my chart in cryptoInfo is ideal. How do I make the size of my stockInfo chart the same?

// StockInfo.jsx

// return (
//     <div className="infos">
//       {dataFromStocks?.data[0] && stockInfoData?.stockInfoData[0] ? (
//         <>
//           <div className="header">
//             <h1>{id}</h1>
//             <div className="chart-info-container">
//               <ApexStockChart interval={interval} id={id} />
//               <div className="info-details">
//                 <table className="table table-sm">

//                   {/* TABLE INTERVAL BUTTONS */}
//                   <thead>
//                     <tr>
//                       <th scope="col">
//                         <button
//                           className={interval === '1h' ? "btn btn-outline-light active" : "btn btn-outline-light"}
//                           onClick={() => setInterval(1)}
//                         >
//                           1 day
//                         </button>
//                       </th>
//                       <th scope="col">
//                         <button
//                           className={interval === '1wk' ? "btn btn-outline-light active" : "btn btn-outline-light"}
//                           onClick={() => setInterval(7)}
//                         >
//                           7 day
//                         </button>
//                       </th>
//                       <th scope="col">
//                         <button
//                           className={interval === '1mo' ? "btn btn-outline-light active" : "btn btn-outline-light"}
//                           onClick={() => setInterval(14)}
//                         >
//                           14 day
//                         </button>
//                       </th>
//                       <th scope="col">
//                         <button
//                           className={interval === '3mo' ? "btn btn-outline-light active" : "btn btn-outline-light"}
//                           onClick={() => setInterval(30)}
//                         >
//                           30 day
//                         </button>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td className={percentChangedHelper(dataFromStocks?.data[0]?.regularMarketPrice, dataFromStocks?.data[0]?.previousClose) >= 0 ? 'positive' : 'negative'}>
//                         {percentChangedHelper(dataFromStocks?.data[0]?.regularMarketPrice, dataFromStocks?.data[0]?.previousClose) >= 0 ? trendingUp : trendingDown} {dataFromStocks?.data[0]?.percentChange} <br />
//                         %{formatNumber(percentChangedHelper(dataFromStocks?.data[0]?.regularMarketPrice, dataFromStocks?.data[0]?.previousClose))}
//                       </td>
//                       <td className={-2.22 >= 0 ? 'positive' : 'positive'}>
//                         {1.46 >= 0 ? trendingUp : trendingDown}
//                         <br />
//                         %0.89
//                       </td>
//                       <td className={-1.32 >= 0 ? 'positive' : 'positive'}>
//                         {1.46 >= 0 ? trendingUp : trendingDown}
//                         <br />
//                         %1.32
//                       </td>
//                       <td className={1.46 >= 0 ? 'positive' : 'negative'}>
//                         {1.46 >= 0 ? trendingUp : trendingDown}
//                         <br />
//                         %2.22
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>

//                 {/* BASIC INFORMATION FROM CHART */}

//                 <div className="details">
//                   Current Price: <strong>
//                     ${dataFromStocks?.data[0]?.regularMarketPrice}
//                   </strong>
//                   <br />
//                   Previous Close: <strong>
//                     ${dataFromStocks?.data[0]?.previousClose}
//                   </strong>

//                   <br />
//                   <br />
//                   <br />
//                   <a href={`${stockInfoData?.stockInfoData[0]?.website}`} target="_blank">
//                     <strong>
//                       {stockInfoData?.stockInfoData[0]?.website}
//                     </strong>
//                   </a>
//                   <br />
//                 </div>

//                 <button onClick={handleClick} className="btn btn-light add-to-watchlist">
//                   <i className={favorite ? "fa fa-star favorited" : "fa fa-star regular"}></i> Add to Watchlist
//                 </button>
//               </div>
//             </div>
//             <p
//               dangerouslySetInnerHTML={{ __html: stockInfoData?.stockInfoData[0]?.longBusinessSummary }}
//             ></p>
//           </div>
//         </>
//       ) : (
//         <div className="loading">
//           <i className="fa fa-spinner fa-spin fa-3x fa-fw" />
//           <span className="sr-only">Loading...</span>
//         </div>
//       )}
//     </div>
//   );

// CryptoInfo.jsx:

// return (
//     <div className="infos">
//       {cryptoData ? (
//         <>
//           <h1>
//             <img src={cryptoData.image.small} alt={cryptoData.name} />
//             {cryptoData.name}
//           </h1>
//           <div className="chart-info-container">
//             <ApexCryptoChart interval={interval}/>
//             <div className="info-details">
//               <table class="table table-sm">
//                 <thead>
//                   <tr>
//                     <th scope="col">
//                       <button 
//                         className={interval === 1 ? "btn btn-outline-light active" : "btn btn-outline-light"}
//                         onClick={() => setInterval(1)} 
//                       >
//                         1 day
//                       </button>
//                     </th>
//                     <th scope="col">
//                       <button 
//                         className={interval === 7 ? "btn btn-outline-light active" : "btn btn-outline-light"}
//                         onClick={() => setInterval(7)} 
//                       >
//                         7 day
//                       </button>
//                     </th>
//                     <th scope="col">
//                       <button 
//                         className={interval === 14 ? "btn btn-outline-light active" : "btn btn-outline-light"}
//                         onClick={() => setInterval(14)} 
//                       >
//                         14 day
//                       </button>
//                     </th>
//                     <th scope="col">
//                       <button 
//                         className={interval === 30 ? "btn btn-outline-light active" : "btn btn-outline-light"}
//                         onClick={() => setInterval(30)} 
//                       >
//                         30 day
//                       </button>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className={cryptoData.market_data.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
//                       {cryptoData.market_data.price_change_percentage_24h >= 0 ? trendingUp : trendingDown}<br/> 
//                       %{formatNumber(cryptoData.market_data.price_change_percentage_24h)}
//                     </td>
//                     <td className={cryptoData.market_data.price_change_percentage_7d >= 0 ? 'positive' : 'negative'}>
//                       {cryptoData.market_data.price_change_percentage_7d >= 0 ? trendingUp : trendingDown}<br/>
//                       %{formatNumber(cryptoData.market_data.price_change_percentage_7d)}
//                     </td>
//                     <td className={cryptoData.market_data.price_change_percentage_14d >= 0 ? 'positive' : 'negative'}>
//                       {cryptoData.market_data.price_change_percentage_14d >= 0 ? trendingUp : trendingDown}<br/>  
//                       %{formatNumber(cryptoData.market_data.price_change_percentage_14d)}
//                     </td>
//                     <td className={cryptoData.market_data.price_change_percentage_30d >= 0 ? 'positive' : 'negative'}>
//                       {cryptoData.market_data.price_change_percentage_30d >= 0 ? trendingUp : trendingDown}<br/>  
//                       %{formatNumber(cryptoData.market_data.price_change_percentage_30d)}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <div className="details">
//                 Current Price: <strong>${formatNumber(cryptoData.market_data.current_price.usd)}</strong>
//                 <br />
//                 Market Cap: <strong>${formatNumber(cryptoData.market_data.market_cap.usd)}</strong> 
//                 <br />
//                 24hr volume: <strong>${formatNumber(cryptoData.market_data.total_volume.usd)}</strong>
//                 <br />
//                 24hr High: <strong>${formatNumber(cryptoData.market_data.high_24h.usd)}</strong>
//                 <br />
//                 24hr Low: <strong>${formatNumber(cryptoData.market_data.low_24h.usd)}</strong>
//                 <br/>
//                 Total Supply (<img src={cryptoData.image.thumb} alt="logo"/>): <strong>{formatNumber(cryptoData.market_data.total_supply)}</strong>
//               </div>
//               <button onClick={handleClick} className="btn btn-light add-to-watchlist">
//                 <i className={ favorite ? "fa-solid fa-star favorited" : "fa-regular fa-star"}></i> Add to Watchlist
//               </button>
//             </div>
//           </div>
//           <p
//             dangerouslySetInnerHTML={{ __html: cryptoData.description.en }}
//           ></p>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );

//   tableItems.scss:

//   currently my tableItems.scss has styling for the charts. It is:

// td.positive {
//   color: #56af3b;
// }

// td.negative {
//   color: #EE4B2B;
// }

// img {

//   height: 20px;
//   width: 20px;
//   margin-bottom: 2px;
  
// }

// .symbol-data {
 
//   align-items: center;
//   :hover {
//     text-decoration: underline;
//   }
// }

// a:link { text-decoration: none; color: inherit;}
// a:visited { text-decoration: none; color: inherit;}
// a:hover { text-decoration: none; color: inherit;}
// a:active { text-decoration: none; color: inherit;}

// h1 {
//   color: white;
// }

// .favorited {
//   color: #ffc107;
// }


// .drop-down-chart {
//   color: black;
// }
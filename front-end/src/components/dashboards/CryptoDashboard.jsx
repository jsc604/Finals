// import CryptoTable from "../dataTables/CryptoTable";
// import useCryptoData from "../../hooks/useCryptoData";
// import Navigation from "../Navigation";
// import { useState } from "react";

// export default function CryptoDashboard(props) {
//   const [watchlist, setWatchlist] = useState(false);

//   const { cryptoData } = useCryptoData('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false');

//   const watchlistToggle = () => {
//     setWatchlist(watchlist === false ? true : false);
//   };


//   return (

//     <main>
//       <div>


//         <h1><strong>Top Crypto Currencies</strong></h1>
//         <form className="search-form">
//           <input
//             className="search-input"
//             type="text"
//             placeholder="Search..."
//           // onChange={(event) => setSearchValue(event.target.value)}
//           />
//           <button className="search-button" type="submit">Submit</button>
//         </form>
//       </div>

//       <Navigation tab={'crypto'} toggle={watchlistToggle} />
//       {cryptoData && <CryptoTable data={cryptoData} />}
//     </main>
//   );
// };


import CryptoTable from "../dataTables/CryptoTable";
import useCryptoData from "../../hooks/useCryptoData";
import Navigation from "../Navigation";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CryptoDashboard(props) {
  const [watchlist, setWatchlist] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { cryptoData } = useCryptoData('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false');

  const watchlistToggle = () => {
    setWatchlist(watchlist === false ? true : false);
  };

  return (
    <main>
      <div>
        <h1><strong>Top Crypto Currencies</strong></h1>
        <form className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            onChange={event => setSearchValue(event.target.value)}
          />
          <Link to={`/crypto/${searchValue.replace(/\s+/g, '-').toLowerCase()}`}>
            <button className="search-button">Submit</button>
          </Link>
        </form>
      </div>

      <Navigation tab={'crypto'} toggle={watchlistToggle} />
      {cryptoData && <CryptoTable data={cryptoData} />}
    </main>
  );
};
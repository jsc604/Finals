import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import StocksDashboard from "./components/dashboards/StocksDashboard";
import CryptoDashboard from "./components/dashboards/CryptoDashboard";
import NftDashboard from "./components/dashboards/NftDashboard";
import CryptoInfo from "./components/infoPages/CryptoInfo";
import NftInfo from "./components/infoPages/NftInfo";
import StockInfo from "./components/infoPages/StockInfo";
import Header from "./components/Header";


import Test from "./hooks/test";
// //SEARCHES FOR CRYPTO DATA
// import CallCrypto from './components/CallCryptoData';
// // SEARCHES FOR MOST POPULAR NFTS
// import CallNFT from './components/CallNFTData';
// // MATCHES CALLNFT API CONTRACT ADDRESS WITH FLOOR API CONTRACT ADDRESS TO DISPLAY FLOOR PRICE AND OTHER METRICS
// import CallNFTFloor from './components/CallNFTFloorPrice'
// // CALLS STOCK API PER TICKER
// import CallStocks from './components/CallStockData'
import classNames from "classnames";

export default function App() {

  const location = useLocation();

  const className = classNames('App', { 'home': location.pathname === '/' });

  return (
    <div className={className}>
      <Header />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="stocks">
          <Route path="dashboard" element={<StocksDashboard />} />
          <Route path=":id" element={<StockInfo />} />
        </Route>

        <Route path="crypto">
          <Route path="dashboard" element={<CryptoDashboard />} />
          <Route path=":id" element={<CryptoInfo />} />
        </Route>

        <Route path="nft">
          <Route path="dashboard" element={<NftDashboard />} />
          <Route path=":id" element={<NftInfo />} />
        </Route>

        <Route path="*" element={<Home />} />


        <Route path="test">
          <Route path="test" element={<Test />} />
        </Route>

      </Routes>
    </div>
  );
}
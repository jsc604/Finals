import Header2 from "./components/Header2";
import { Routes, Route } from "react-router-dom";
import CryptoDashboard from "./components/CryptoDashboard"
import NftDashBoard from "./components/NftDashboard"
import StocksDashboard from "./components/StocksDashboard";
import Home from "./components/Home";
//SEARCHES FOR CRYPTO DATA
import CallCrypto from './components/CallCryptoData'; 
// SEARCHES FOR MOST POPULAR NFTS
import CallNFT from './components/CallNFTData'; 
// MATCHES CALLNFT API CONTRACT ADDRESS WITH FLOOR API CONTRACT ADDRESS TO DISPLAY FLOOR PRICE AND OTHER METRICS
import CallNFTFloor from './components/CallNFTFloorPrice' 
// CALLS STOCK API PER TICKER
import CallStocks from './components/CallStockData'

export default function App() {
  return (
    <div className="App">
      <Header2 />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard">
          <Route path="stocks" element={<StocksDashboard />} />
          <Route path="crypto" element={<CryptoDashboard />}/>
          <Route path="nft" element={<NftDashBoard />} />
        </Route>
        <Route path="*" element={<Home/>} />
      </Routes>
    </div>
  );
}

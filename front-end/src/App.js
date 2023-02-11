import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import StocksDashboard from "./components/dashboards/StocksDashboard";
import CryptoDashboard from "./components/dashboards/CryptoDashboard"
import NftDashboard from "./components/dashboards/NftDashboard"
import CryptoInfo from "./components/infoPages/CryptoInfo";
import NftInfo from "./components/infoPages/NftInfo";
import Header from "./components/Header";
import Test from "./hooks/test";
import classNames from "classnames";
import WatchlistProvider from "./providers/WatchlistProvider";
import NftInfo2 from "./components/infoPages/NftInfo2";

export default function App() {

  const location = useLocation();

  const className = classNames('App', {'home': location.pathname === '/'});
  
  return (
    <div className={className}>
      <WatchlistProvider>
        <Header />
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="stocks">
            <Route path="dashboard" element={<StocksDashboard />} />
            {/* <Route path=":id" element={<StockInfo />} /> */}
          </Route>

          <Route path="crypto">
            <Route path="dashboard" element={<CryptoDashboard />}/>
            <Route path="watchlist" element={<CryptoDashboard />}/>
            <Route path=":id" element={<CryptoInfo />} />
          </Route>

          <Route path="nft">
            <Route path="dashboard" element={<NftDashboard />} />
            <Route path="watchlist" element={<NftDashboard />}/>
            <Route path=":id" element={<NftInfo2 />} />
          </Route>

          <Route path="*" element={<Home />} />

          <Route path="test" element={<Test />} />

        </Routes>
      </WatchlistProvider>
    </div>
  );
}
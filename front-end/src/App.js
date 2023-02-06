import React, { useState, useEffect } from "react";
import "./styles/app.scss";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard"
import Home from "./components/Home";
//SEARCHES FOR CRYPTO DATA
import CallCrypto from './components/CallCryptoData'; 
// SEARCHES FOR MOST POPULAR NFTS
import CallNFT from './components/CallNFTData'; 
// MATCHES CALLNFT API CONTRACT ADDRESS WITH FLOOR API CONTRACT ADDRESS TO DISPLAY FLOOR PRICE AND OTHER METRICS
import CallNFTFloor from './components/CallNFTFloorPrice' 
// CALLS STOCK API PER TICKER
import CallStocks from './components/CallStockData'
import GetNFTLowestPrice from "./components/TEST-MORALIS-api-test";
import Top100NFT from "./components/TEST-CSLAM-TOP100";
import SalesSummary from "./components/TEST-CSLAM-SALESSUMMARY";



export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/api-test-name" element={<CallNFT/>} />
        <Route path="/api-test-floor_price" element={<CallNFTFloor/>} />
        <Route path="/moralis" element={<GetNFTLowestPrice/>} />
        <Route path="/top100" element={<Top100NFT/>} />
        {/* <Route path="/salessummary" element={<SalesSummary/>} /> */}
      </Routes>
    </div>
  );
}

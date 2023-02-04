import React, { useState, useEffect } from "react";
import "./styles/app.scss";
import axios from "axios";
import HomepageButton from "./components/HomepageButton";
import Header from "./components/Header";


function App() {
  const [nftData, setNftData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=canto&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        setNftData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          
          <p>Loading...</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <div>
        <h2>
          "You miss 100% of the shots you don't take" - Michael Scott  -- Michael Jordan
        </h2>
      </div>
      <div className="homepage-button-group">
        <HomepageButton>Stocks</HomepageButton>
        <HomepageButton>Crypto</HomepageButton>
        <HomepageButton>NFT</HomepageButton>
      </div>
    </div>
  );
}

export default App;

import CurrencyTable from "./CurrencyTable";
import NftTable from "./NftTable";
import { useState } from "react";
import classNames from "classnames";

export default function Dashboard(props) {
  const [activeButton, setActiveButton] = useState("Stocks");

  const handleButtonClick = (event) => {
    setActiveButton(event.target.innerText);
  };

  return (
    <main>
      <nav class="navbar navbar-light bg-dark">
        <div>
          <button
            className={classNames("btn btn-outline-warning", {
              "active": activeButton === "Stocks",
            })}
            type="button"
            onClick={handleButtonClick}
          >
            Stocks
          </button>
          <button
            className={classNames("btn btn-outline-warning", {
              "active": activeButton === "Crypto",
            })}
            type="button"
            onClick={handleButtonClick}
          >
            Crypto
          </button>
          <button
            className={classNames("btn btn-outline-warning", {
              "active": activeButton === "NFT's",
            })}
            type="button"
            onClick={handleButtonClick}
          >
            NFT's
          </button>
        </div>

        <div>
          <button
            className={classNames("btn btn-outline-warning", {
              "active": activeButton === "Watchlist",
            })}
            type="button"
            onClick={handleButtonClick}
          >
            Watchlist
          </button>
        </div>
      </nav>

      {activeButton === "Stocks" && <CurrencyTable />}
      {activeButton === "Crypto" && <CurrencyTable />}
      {activeButton === "NFT's" && <NftTable />}
    </main>
  );
};

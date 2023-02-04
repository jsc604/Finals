import CryptoTable from "./dataTables/CryptoTable";
import "../styles/tableItems.scss";
import formatNumber from "../helpers/table_helpers";
import { Link } from "react-router-dom";
import coinData from "../samples/coinData";

export default function CryptoDashboard(props) {
  return (
    <main>
      <nav className="navbar navbar-light bg-dark">
        <div>
          <button className="btn btn-outline-warning" type="button">
            <Link to="/dashboard/stocks">Stocks</Link>
          </button>
          <button className="btn btn-outline-warning active" type="button">
            <Link to="/dashboard/crypto">Crypto</Link>
          </button>
          <button className="btn btn-outline-warning" type="button">
            <Link to="/dashboard/nft">NFT's</Link>
          </button>
        </div>

        <div>
          <button className="btn btn-outline-warning" type="button">
            Watchlist
          </button>
        </div>
      </nav>

      <CryptoTable 
        formatNumber={formatNumber} 
        data={coinData} 
      />
    </main>
  );
}

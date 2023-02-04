import NftTable from "./dataTables/NftTable";
import "../styles/tableItems.scss";
import { Link } from "react-router-dom";
import formatNumber from "../helpers/table_helpers";
import nftData from "../samples/nftData";

export default function NftDashboard(props) {
  return (
    <main>
      <nav className="navbar navbar-light bg-dark">
      <div>
        <button 
          className="btn btn-outline-warning" type="button">
          <Link to="/dashboard/stocks">Stocks</Link> 
        </button>
        <button 
          className="btn btn-outline-warning" type="button">
          <Link to="/dashboard/crypto">Crypto</Link>
        </button>
        <button 
          className="btn btn-outline-warning active" type="button">
          <Link to="/dashboard/nft">NFT's</Link>
        </button>
      </div>

      <div>
        <button 
          className="btn btn-outline-warning" type="button">
          Watchlist
        </button>
      </div>
      </nav>

      <NftTable 
        formatNumber={formatNumber}
        data={nftData} 
      />
    </main>
  );
};
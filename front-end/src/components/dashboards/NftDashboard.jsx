import NftTable from "../dataTables/NftTable";
import Navigation from "../Navigation";
import useNftData from "../../hooks/useNftData";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function NftDashboard(props) {
  const { nftData } = useNftData();
  const [searchValue, setSearchValue] = useState("");

  return (
    <main>
      <div>
      <h1><strong>Top NFT Collections</strong></h1>
        <form className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            onChange={event => setSearchValue(event.target.value)}
          />
          <Link to={`/nft/${searchValue.replace(/\s+/g, '-').toLowerCase()}`}>
            <button className="search-button">Submit</button>
          </Link>
        </form>
      </div>
      
      <Navigation tab={'nft'} />
      { nftData && nftData.length !== 0 && <NftTable data={nftData} /> }
    </main>
  );
};
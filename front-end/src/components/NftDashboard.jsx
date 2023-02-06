import NftTable from "./dataTables/NftTable";
import "../styles/tableItems.scss";
import {formatNumber} from "../helpers/table_helpers";
import nftData from "../samples/nftData";
import Navigation from "./Navigation";

export default function NftDashboard(props) {
  return (
    <main>
      <h1><strong>Top NFT Collections</strong></h1>
      <Navigation tab={'nft'} />
      <NftTable 
        formatNumber={formatNumber}
        data={nftData} 
      />
    </main>
  );
};
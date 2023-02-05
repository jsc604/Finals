import NftTable from "./dataTables/NftTable";
import "../styles/tableItems.scss";
import {formatNumber} from "../helpers/table_helpers";
import nftData from "../samples/nftData";
import Navigation from "./Navigation";

export default function NftDashboard(props) {
  return (
    <main>
      <Navigation tab={'nft'} />
      <NftTable 
        formatNumber={formatNumber}
        data={nftData} 
      />
    </main>
  );
};
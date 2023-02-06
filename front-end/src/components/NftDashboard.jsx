import NftTable from "./dataTables/NftTable";
import nftData from "../samples/nftData";
import Navigation from "./Navigation";

export default function NftDashboard(props) {
  return (
    <main>
      <h1><strong>Top NFT Collections</strong></h1>
      <Navigation tab={'nft'} />
      <NftTable data={nftData} />
    </main>
  );
};
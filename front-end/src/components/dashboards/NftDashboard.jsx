import NftTable from "../dataTables/NftTable";
import Navigation from "../Navigation";
import useNftData from "../../hooks/testNftData";


export default function NftDashboard(props) {
  const { nftData } = useNftData();
  // console.log('====', nftData);
  return (
    <main>
      <h1><strong>Top NFT Collections</strong></h1>
      <Navigation tab={'nft'} />
      { nftData && nftData.length !== 0 && <NftTable data={nftData} /> }
    </main>
  );
};
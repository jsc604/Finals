import nftData from "../samples/nftData";
import NftItems from "./NftItems";

export default function NftTable(props) {
  let nftItems = nftData.map((nft, i) => (
    <NftItems
      key={i}
      collection={nft.name}
      volume={nft.volume_24h.native_currency}
      price={nft.floor_price.native_currency}
      change={nft.floor_price_in_usd_24h_percentage_change}
      marketCap={nft.market_cap.usd}
    />
  ));

  return (
    <table className="table table-dark table-hover">
      <thead>
        <tr>
          <th scope="col">Collection</th>
          <th scope="col">24hr Volume</th>
          <th scope="col">Floor Price</th>
          <th scope="col">24hr change</th>
          <th scope="col">Market Cap</th>
          <th scope="col">Chart</th>
        </tr>
      </thead>
      <tbody>
        {nftItems}
      </tbody>
    </table>
  );
};

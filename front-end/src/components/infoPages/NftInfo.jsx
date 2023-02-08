import { useParams } from "react-router-dom";
import useNftData from "../../hooks/useNftData";
import "../../styles/infoPage.scss";
// import NftChart from "../charts/NftChart";




export default function NftInfo(props) {


  const { id } = useParams();
  const { nftData } = useNftData();

  console.log("nftData", nftData);
  console.log("nftData[id]", nftData[id]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <td style={{ width: '30%', textAlign: 'center' }}>
        {nftData ? (
          nftData.find(nft => nft.id === id) ? (
            nftData.find(nft => nft.id === id).image &&
              nftData.find(nft => nft.id === id).image.small ? (
              <img
                src={nftData.find(nft => nft.id === id).image.small}
                alt="nft"
                style={{ maxWidth: '1000%', height: 'auto' }}
              />
            ) : (
              <p style={{ fontStyle: 'italic' }}>Image not available</p>
            )
          ) : (
            <p style={{ fontStyle: 'italic' }}>NFT not found</p>
          )
        ) : (
          <p style={{ fontStyle: 'italic' }}>Loading...</p>
        )}
      </td>
      <td style={{ width: '70%', textAlign: 'center', color: 'white' }}>
        {nftData ? (
          nftData.find(nft => nft.id === id) ? (
            nftData.find(nft => nft.id === id).image &&
              nftData.find(nft => nft.id === id).description ? (
              <p>{nftData.find(nft => nft.id === id).description}</p>
            ) : (
              <p style={{ fontStyle: 'italic' }}>Information not available</p>
            )
          ) : (
            <p style={{ fontStyle: 'italic' }}>NFT not found</p>
          )
        ) : (
          <p style={{ fontStyle: 'italic' }}>Loading...</p>
        )}
      </td>
    </div>

  );
}
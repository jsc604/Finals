import { useParams } from "react-router-dom";
import useNftData from "../../hooks/useNftData";
import "../../styles/infoPage.scss";
// import NftChart from "../charts/NftChart";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";




export default function NftInfo(props) {
  const [favorite, setFavorite] = useState(false);


  const { id } = useParams();
  const { nftData } = useNftData(`${id}`);

  const { user } = useAuth0();

  const handleClick = () => {
    setFavorite(!favorite);
    const payload = {
      email: user.email,
      apiId: id,
      category: 'crypto'
    };
    if (favorite) {
      axios.post('http://localhost:8080/favoriteDelete', payload)
        .then(result => {
          console.log('RESULT: ', result);
        })
        .catch(ex => {
          console.log(ex);
        });
    } else {
      axios.post('http://localhost:8080/favoriteInsert', payload)
        .then(result => {
          console.log('RESULT: ', result);
        })
        .catch(ex => {
          console.log(ex);
        });
    }
  };


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
                style={{ width: '400%', height: 'auto', opacity: 0.15 }}
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
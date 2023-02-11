import { useParams } from "react-router-dom";
import useNftInfo from "../../hooks/useNftInfo";
import { useState } from "react";


export default function NftInfo2(props) {
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();
  
  const { nftInfo } = useNftInfo(id);


  if (!nftInfo) {
    return <p>Loading....</p>
  }

  return (
    <>
    <h1>{nftInfo.name}</h1>
    </>
  )
}
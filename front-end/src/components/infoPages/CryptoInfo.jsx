import { useParams } from "react-router-dom";
import useCryptoData from "../../hooks/useCryptoData";
import "../../styles/infoPage.scss"
import CryptoChart from "../charts/CryptoChart";

export default function CryptoInfo(props) {

  const { id } = useParams();
  const { cryptoData } = useCryptoData(
    `coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&sparkline=false`
  );

  return (
    <div className="infos">
      {cryptoData ? (
        <>
          <h1>
            <img src={cryptoData.image.small} alt={cryptoData.name}/>
            {cryptoData.name}
          </h1>
          <CryptoChart />
          <p dangerouslySetInnerHTML={{ __html: cryptoData.description.en }} ></p>
        </>
      ) : (<p>Loading...</p>)}
    </div>
  );
  
}

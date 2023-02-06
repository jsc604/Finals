import "../styles/HomepageButton2.scss"
import { Link } from "react-router-dom";

export default function Home(props) {
  
  return (
    <>
      <div>
        <h2>
          <strong>"You miss 100% of the shots you don't take - Wayne Gretzky" - Michael Scott</strong>
        </h2>
      </div>
      <div className="homepage-button-group">
        <Link to="stocks/dashboard">Stocks</Link>
        <Link to="crypto/dashboard">Crypto</Link>
        <Link to="nft/dashboard">Nft</Link>
      </div>
    </>
  );
};
import HomepageButton from "./HomepageButton";
import "../styles/HomepageButton.scss"
import "../styles/app.scss"
import { Link } from "react-router-dom";

export default function Home(props) {

  return (
    <>
      <div>
        <h2>
          "You miss 100% of the shots you don't take" - Michael Scott  -- Michael Jordan
        </h2>
      </div>
      <div className="homepage-button-group">
        <HomepageButton>Stocks</HomepageButton>
        <HomepageButton><Link to="dashboard/crypto">Crypto</Link></HomepageButton>
        <HomepageButton>NFT</HomepageButton>
      </div>
    </>
  );
};
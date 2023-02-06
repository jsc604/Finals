import HomepageButton from "./HomepageButton";
import "../styles/HomepageButton.scss"
import "../styles/app.scss"
import { Link } from "react-router-dom";
import "../styles/home.scss"

export default function Home(props) {

  return (
    <div className="home">
      <div>
        <h2>
          <strong>"You miss 100% of the shots you don't take" - Michael Scott  -- Michael Jordan</strong>
        </h2>
      </div>
      <div className="homepage-button-group">
        <HomepageButton>Stocks</HomepageButton>
        <HomepageButton>
          <Link to="dashboard">Crypto</Link>
        </HomepageButton>
        <HomepageButton>NFT</HomepageButton>
      </div>
    </div>
  );
};
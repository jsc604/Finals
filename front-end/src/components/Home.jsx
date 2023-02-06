import HomepageButton from "./HomepageButton";
import "../styles/HomepageButton2.scss"
import "../styles/app.scss"
import { Link } from "react-router-dom";

export default function Home(props) {


  let style = {
    height: "60px",
    width: "150px",
    fontSize: "2em"
  }
  
  return (
    <>
      <div>
        <h2>
          "You miss 100% of the shots you don't take" - Michael Scott  -- Michael Jordan
        </h2>
      </div>
      <div className="homepage-button-group">
        <HomepageButton><Link to="stocks/dashboard">Stocks</Link></HomepageButton>
        <HomepageButton><Link to="crypto/dashboard">Crypto</Link></HomepageButton>
        <HomepageButton><Link to="nft/dashboard">Nft</Link></HomepageButton>
        {/* <button className="btn btn-lg btn-outline-warning btn-dark" type="button" style={style}><Link to="stocks/dashboard">Stocks</Link></button> */}
        {/* <button className="btn btn-lg btn-outline-warning btn-dark" type="button" style={style}><Link to="crypto/dashboard">Crypto</Link></button> */}
        {/* <button className="btn btn-lg btn-outline-warning btn-dark" type="button" style={style}><Link to="nft/dashboard">Nft</Link></button> */}
      </div>
    </>
  );
};
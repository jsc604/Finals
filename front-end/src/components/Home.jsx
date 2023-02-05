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
        <HomepageButton><Link to="dashboard/stocks">Stocks</Link></HomepageButton>
        <HomepageButton><Link to="dashboard/crypto">Crypto</Link></HomepageButton>
        <HomepageButton><Link to="dashboard/nft">Nft</Link></HomepageButton>
        {/* <button className="btn btn-lg btn-outline-warning btn-dark" type="button" style={style}><Link to="dashboard/nft">Stocks</Link></button> */}
        {/* <button className="btn btn-lg btn-outline-warning btn-dark" type="button" style={style}><Link to="dashboard/nft">Crypto</Link></button> */}
        {/* <button className="btn btn-lg btn-outline-warning btn-dark" type="button" style={style}><Link to="dashboard/nft">Nft</Link></button> */}
      </div>
    </>
  );
};
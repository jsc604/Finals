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
          <strong>"You miss 100% of the shots you don't take - Wayne Gretzky" - Michael Scott</strong>
        </h2>
      </div>
      <div className="homepage-button-group">
        <Link to="stocks/dashboard">Stocks</Link>
        <Link to="crypto/dashboard">Crypto</Link>
        <Link to="nft/dashboard">Nft</Link>
        {/* <button className="btn btn-lg btn-outline-warning btn-dark" type="button" style={style}><Link to="stocks/dashboard">Stocks</Link></button> */}
        {/* <button className="btn btn-lg btn-outline-warning btn-dark" type="button" style={style}><Link to="crypto/dashboard">Crypto</Link></button> */}
        {/* <button className="btn btn-lg btn-outline-warning btn-dark" type="button" style={style}><Link to="nft/dashboard">Nft</Link></button> */}
      </div>
    </>
  );
};
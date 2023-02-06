import { useState } from "react";
import { Link } from "react-router-dom";
import HomepageButton from "./HomepageButton";

export default function Header2() {
  
  const [login, setLogin] = useState(false);
  
  const user = 'Mr Bond';

  const handleClick = () => {
    setLogin(!login)
  }
 
  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 0px 20px 100px" 
  };

  return (
    <header style={headerStyles}>
      <button className="btn btn-lg btn-outline-warning btn-dark" type="button"><Link to="/"><strong>Waves Tracker</strong></Link></button>
      <button className="btn btn-lg btn-outline-warning btn-dark" type="button">Login</button>
      {/* <button className="btn btn-lg btn-outline-warning btn-dark" type="button"><Link to="/">Waves Tracker</Link></button> */}
      {/* <HomepageButton><Link to="/">Login</Link></HomepageButton> */}
    </header>
  )
};
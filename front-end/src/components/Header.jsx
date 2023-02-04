import "../styles/app.scss";
import "../styles/header.scss";
import Button from "./Button";
import { useState } from "react";



export default function Header() {
  
  const [login, setLogin] = useState(false);
  
  const user = 'Mr Bond';

  const handleClick = () => {
    setLogin(!login)
  }


  return (
    <header className="header">
      <div className="buttons">

      {!login ? (
        < Button handleClick={ handleClick }>Login</Button>
        ) : (
          <div className="logged-in">
          Welcome, {user}
          < Button handleClick={ handleClick }>Logout</Button>
        </div>
      )}
      </div>
    </header>
  )
}
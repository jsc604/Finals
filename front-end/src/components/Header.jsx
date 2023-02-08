import "../styles/app.scss";
import "../styles/header.scss";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";


export default function Header() {
  
  const {isAuthenticated, user} = useAuth0(); 

  return (
    <header className="header">
      {/* <div >
        <img className="logo" src="/home/labber/lighthouse/finals/Finals/front-end/public/riding-wave-logo.png" alt="wave logo" />
      </div> */}
      <div className="buttons">

        {!isAuthenticated ? (
          < LoginButton />
          ) : (
          <div className="buttons">
            <h3><strong>Welcome, {user.email}</strong></h3>
            < LogoutButton />
          </div>
        )}
      </div>
    </header>
  )
}
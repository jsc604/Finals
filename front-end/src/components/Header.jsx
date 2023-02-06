import "../styles/app.scss";
import "../styles/header.scss";
import { useState } from "react";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import Login  from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";




export default function Header() {
  
  const {isAuthenticated, user} = useAuth0(); 

  return (
    <header className="header">
      <div className="buttons">

          {!isAuthenticated ? (
          < Login />
          ) : (
            <div className="buttons">
          <h3>Welcome, {user.email}</h3>
          < Logout/>
            </div>

          )}
      </div>
    </header>
  )
}

// {!login ? (
//   < LoginButton onClick={ handleClick }/>
//   ) : (
//     <div className="logged-in">
//     Welcome, {user.email}
//     < LogoutButton />
//   </div>
// )}
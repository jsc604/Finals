// import HomepageButton from "./HomepageButton";
// import "../styles/HomepageButton.scss"
import "../styles/app.scss"
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";


export default function Home(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log('USER: ', user)

  useEffect(() => {
    axios.post('http://localhost:8080/users', user)
    .then(result => {
      console.log('RESULT: ', result)
    })
  },[user])

    if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div>
        <h2>
          <strong>"You miss 100% of the shots you don't take - Wayne Gretzky" - Michael Scott</strong>
        </h2>
      </div>
      <div className="homepage-button-group">
        <Link to="dashboard">Crypto</Link>
        <Link to="dashboard">Stocks</Link>
        <Link to="dashboard">NFT</Link>
      </div>
    </>
  );
};
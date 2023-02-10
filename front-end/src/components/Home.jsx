import "../styles/HomepageButton2.scss"
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";



export default function Home(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();

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
          <strong>What are we tracking today Anon?</strong>
        </h2>
      </div>
      <div className="homepage-button-group">
        <Link to="stocks/dashboard">Stocks</Link>
        <Link to="crypto/dashboard">Crypto</Link>
        <Link to="nft/dashboard">Nft</Link>
      </div>
    </>
  );
};
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log('USER: ', user)

  useEffect(() => {
    console.log('USE EFFECT!')
    axios.post('http://localhost:8080/users', user)
    .then(result => {
      console.log('RESULT: ', result)
    })
  },[])

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
import { useState } from "react";
import { createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const watchlistContext = createContext();

export default function WatchlistProvider(props) {
  const [watchlist, setWatchlist] = useState(false);
  const {user} = useAuth0();
  const watchlistToggle = function() {
    setWatchlist(watchlist === false ? true : false);
  };

  const watchlistData = {  watchlistToggle, watchlist, user };

  return (
    <watchlistContext.Provider value={watchlistData}>
      {props.children}
    </watchlistContext.Provider>
  )
}
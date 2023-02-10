import { useState } from "react";
import { createContext } from "react";

export const watchlistContext = createContext();

export default function WatchlistProvider(props) {
  const [watchlist, setWatchlist] = useState(false);

  const watchlistToggle = function() {
    setWatchlist(watchlist === false ? true : false);
  };

  const watchlistData = {  watchlistToggle, watchlist };

  return (
    <watchlistContext.Provider value={watchlistData}>
      {props.children}
    </watchlistContext.Provider>
  )
}
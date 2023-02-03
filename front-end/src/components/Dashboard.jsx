import CurrencyTable from "./CurrencyTable";
import NftTable from "./NftTable";

export default function Dashboard(props) {
  return (
    <main>
      <nav class="navbar navbar-light bg-dark">
        <div>
          <button class="btn btn-outline-warning " type="button">
            Stocks
          </button>
          <button class="btn btn-outline-warning active" type="button">
            Crypto
          </button>
          <button class="btn btn-outline-warning" type="button">
            NFT's
          </button>
        </div>

        <div>
          <button class="btn btn-outline-warning" type="button">
            Watchlist
          </button>
        </div>
      </nav>

      <CurrencyTable />
      <NftTable/>
    </main>
  );
};

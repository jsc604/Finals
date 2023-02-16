export default function Footer(props) {
  return (
    <footer class="py-3 my-4" style={{color: 'white'}}>
      <a
        href="https://www.coingecko.com/"
        className="nav-link px-2 text-muted"
        target="_blank"
        rel="noreferrer"
      >
        Data provided by CoinGecko
      </a>
      <p class="text-center text-muted">© 2023 MoonShot</p>
    </footer>
  );
}

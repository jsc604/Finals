import axios from 'axios'

export default function handleSubmit(eventTest, setLoading, formData, setCryptoData, setError) {
  eventTest.preventDefault();
  setLoading(true);

  const { example } = formData;
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${example}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

  axios.get(apiUrl)
    .then(response => {
      console.log(response.data)
      setCryptoData(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
};


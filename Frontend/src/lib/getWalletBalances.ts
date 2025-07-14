const getWalletBalances = async (chain: string, address: string) => {
  try {
    const response = await fetch(
      `https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=${chain}`,
      {
        headers: {
          accept: "application/json",
          "X-API-Key": import.meta.env.VITE_MORALIS_APIKEY,
        },
      }
    );
    const data = await response.json().then((data) => {
      const result = data?.result?.filter(
        (item) =>
          !item.possible_spam &&
          Number(item.security_score) > 10 &&
          item.verified_contract
      );
      return result;
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};

export default getWalletBalances;

const useCryptoDataService = () => {
  const baseURL = "https://api.coingecko.com/api/v3";

  const getTopMovers = async (limit = 20) => {
    try {
      const response = await fetch(
        `${baseURL}/coins/markets?vs_currency=usd&price_change_percentage=1h&per_page=100&page=1&sparkline=true`
      );
      const data = await response.json();

      const gainers = data
        .filter((coin) => coin.price_change_percentage_24h > 0)
        .slice(0, limit);
      const losers = data
        .filter((coin) => coin.price_change_percentage_24h < 0)
        .slice(0, limit);

      return { gainers, losers };
    } catch (error) {
      console.error("Error fetching top movers:", error);
      return { gainers: [], losers: [] };
    }
  };

  const getCandleData = async (coinId, days = 7) => {
    try {
      const response = await fetch(
        `${baseURL}/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching candle data:", error);
      return [];
    }
  };

  const getHistoricalData = async (coinId, days = 1) => {
    try {
      const response = await fetch(
        `${baseURL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=hourly`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching historical data:", error);
      return null;
    }
  };

  return { getTopMovers, getCandleData, getHistoricalData };
};

export { useCryptoDataService };

const getWalletBalances = async (
  chain: string,
  address: string
): Promise<{ data: unknown[]; unsafeData: unknown[] }> => {
  const key = `${chain}:${address}`;
  const now = Date.now();

  const cached = JSON.parse(localStorage.getItem(key));

  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

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

    const data = await response.json();
    const filteredData = data?.result?.filter(
      (item) =>
        !item.possible_spam &&
        Number(item.security_score) > 10 &&
        item.verified_contract
    );

    const result = { data: filteredData, unsafeData: data.result };

    localStorage.setItem(
      key,
      JSON.stringify({
        data: result,
        expiresAt: now + 10 * 60 * 1000, // 10 minutes
      })
    );

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default getWalletBalances;

const getWalletHistory = async (
  chain: string,
  address: string,
  limit: number
) => {
  const key = `${chain}:${address}:${limit}`;
  const now = Date.now();
  const cached = JSON.parse(localStorage.getItem(key));

  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  try {
    const response = await fetch(
      `https://deep-index.moralis.io/api/v2.2/wallets/${address}/history?chain=${chain}&order=DESC&limit=${limit}`,
      {
        headers: {
          accept: "application/json",
          "X-API-Key": import.meta.env.VITE_MORALIS_APIKEY,
        },
      }
    );

    const data = await response.json();
    const result = data?.result || [];

    localStorage.setItem(
      key,
      JSON.stringify({
        data: result,
        expiresAt: now + 10 * 60 * 1000, // 10 minutes
      })
    );

    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const useCryptoDataService = () => {
  const baseURL = "https://api.coingecko.com/api/v3";

  const historicalCache = new Map<
    string,
    { data: unknown; expiresAt: number }
  >();

  const getTopMovers = async (limit = 20) => {
    const topMoversCache = JSON.parse(localStorage.getItem("topMoversCache"));
    const now = Date.now();
    if (topMoversCache.data && topMoversCache.expiresAt > now) {
      return topMoversCache.data;
    }

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

      const result = { gainers, losers };
      localStorage.setItem(
        "topMoversCache",
        JSON.stringify({
          data: result,
          expiresAt: now + 5 * 60 * 1000, // 5 دقیقه کش
        })
      );

      return result;
    } catch (error) {
      console.error("Error fetching top movers:", error);
      return { gainers: [], losers: [] };
    }
  };

  const getCandleData = async (coinId: string, days = 7) => {
    const key = `${coinId}:${days}`;
    const now = Date.now();
    const cached = JSON.parse(localStorage.getItem(key));

    if (cached && cached.expiresAt > now) {
      return cached.data;
    }

    try {
      const response = await fetch(
        `${baseURL}/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`
      );
      const data = await response.json();

      localStorage.setItem(
        key,
        JSON.stringify({
          data,
          expiresAt: now + 5 * 60 * 1000,
        })
      );

      return data;
    } catch (error) {
      console.error("Error fetching candle data:", error);
      return [];
    }
  };

  const getHistoricalData = async (coinId: string, days = 1) => {
    const key = `${coinId}:${days}`;
    const now = Date.now();
    const cached = JSON.parse(localStorage.getItem(key));
    if (cached && cached.expiresAt > now) {
      return cached.data;
    }

    try {
      const response = await fetch(
        `${baseURL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=hourly`
      );
      const data = await response.json();

      localStorage.setItem(
        key,
        JSON.stringify({
          data,
          expiresAt: now + 5 * 60 * 1000,
        })
      );

      return data;
    } catch (error) {
      console.error("Error fetching historical data:", error);
      return null;
    }
  };

  return { getTopMovers, getCandleData, getHistoricalData };
};

export { useCryptoDataService, getWalletHistory };

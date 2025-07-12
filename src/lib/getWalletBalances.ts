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

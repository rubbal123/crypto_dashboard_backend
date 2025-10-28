import { RestClient } from "okx-api";
import dotenv from "dotenv";
dotenv.config();

export const okxClient = new RestClient({
  apiKey: process.env.OKX_API_KEY || "",
  apiSecret: process.env.OKX_API_SECRET || "",
  apiPass: process.env.OKX_API_PASS || "",
});

export const getOkxBalance = async () => {
  
  const result = await okxClient.getBalance();
  if (!result || result.length === 0) return null;

  const { totalEq, details } = result[0];
  const coins = (details || []).map((coin: any) => ({
    coinName: coin.ccy,
    balance: coin.eq,
    usdBalance: coin.eqUsd,
  }));

  return {
    source: "OKX",
    totalBalance: totalEq,
    //coinData: coins,
  };
};

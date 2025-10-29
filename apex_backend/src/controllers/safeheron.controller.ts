import { Request, Response } from "express";
//import { accountApi } from "../services/safeheron.service";
import BalanceHistory from "../models/BalanceHistory";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import {AccountApi,AccountCoinBalanceRequest,AccountCoinBalanceResponse, ListAccountCoinRequest,AccountCoinResponse} from "@safeheron/api-sdk";
dotenv.config();

const API_KEY = process.env.SAFEHERON_API_KEY || "";
const BASE_URL = process.env.SAFEHERON_API_BASE || "https://api.safeheron.com";
const accountApi = new AccountApi({
      baseUrl: BASE_URL,
      apiKey: API_KEY,
      rsaPrivateKey: "file:./src/public/private/new-private-4096.pem",
      safeheronRsaPublicKey: "file:./src/public/public/platform-public-4096.pem",
      requestTimeout: 60000
  });
export const getSafeheronBalance = async (req: Request, res: Response) => {
  
  try {
      const request: AccountCoinBalanceRequest = {
          coinKeyList: [
            "ETH(SEPOLIA)_ETHEREUM_SEPOLIA"
          ],
      }
      let accountCoinBalanceResponse:AccountCoinBalanceResponse = await accountApi.accountCoinBalance(request);
      res.json(accountCoinBalanceResponse);
  } catch (error: any) {
    console.error("Safeheron getBalance error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch wallet balance" });
  }
};

export const accountCoinList = async (req: Request, res: Response) => {
  
  try {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    const data:any = await BalanceHistory.findOne({
      where: { source:"Safeheron", date: yesterdayStr },
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("totalBalance")), "totalBalance"],
      ],
      raw: true,
    });

    const yesterTotalBalance = data?.totalBalance
      const WALLET_ACCOUNT_KEY = process.env.SAFEHERON_WALLET_ACCOUNT_KEY || "";
      const request: ListAccountCoinRequest = {
          accountKey: WALLET_ACCOUNT_KEY
      }
      const accountCoinResponse = await accountApi.listAccountCoin(request);
      const response = [];
      let totalBalance = 0;
      for (let i = 0; i < accountCoinResponse.length; i++) {
           // console.log(`coinKey: ${accountCoinResponse[i].coinKey}`);
            let val = {};
            totalBalance = totalBalance + Number(accountCoinResponse[i].usdBalance);
            val = {
              'coinKey': accountCoinResponse[i].coinKey,
              'coinName': accountCoinResponse[i].coinName,
              'coinFullName':accountCoinResponse[i].coinFullName,
              'logoUrl':accountCoinResponse[i].logoUrl,
              'balance':accountCoinResponse[i].balance,
              'usdBalance':accountCoinResponse[i].usdBalance,
            }
            response.push(val);
        }
const diff = totalBalance - yesterTotalBalance;
       const percentage = (diff / yesterTotalBalance) * 100;
       const status =
      percentage > 0
        ? "increase"
        : percentage < 0
        ? "decrease"
        : "no_change";
      let resVal = {
        'coins':response,
        'totalWalletBalance':totalBalance,
        'yesterdayStatus':{ percentage: +percentage.toFixed(2), status }
      }
      res.json(resVal);
  } catch (error: any) {
    console.error("Safeheron getBalance error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch wallet balance" });
  }
};

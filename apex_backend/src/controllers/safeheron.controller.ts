import { Request, Response } from "express";
import { accountApi } from "../services/safeheron.service";
import {AccountCoinBalanceRequest,AccountCoinBalanceResponse, ListAccountCoinRequest,AccountCoinResponse} from "@safeheron/api-sdk";

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

      let resVal = {
        'coins':response,
        'totalWalletBalance':totalBalance
      }
      res.json(resVal);
  } catch (error: any) {
    console.error("Safeheron getBalance error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch wallet balance" });
  }
};

import { Request, Response } from "express";
//import { accountApi } from "../services/safeheron.service";
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

export const getSafeheronBalance = async () => {
  
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
        return {
            source: "Safeheron",
            totalBalance,
            
        };
    //   let resVal = {
    //     'coins':response,
    //     'totalWalletBalance':totalBalance
    //   }
    //   res.json(resVal);
  } catch (error: any) {
    console.error("Safeheron getBalance error:", error);
    
  }
};

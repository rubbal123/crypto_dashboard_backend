import { Request, Response } from "express";
import { RestClient } from "okx-api";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OKX_API_KEY || "";
const apiSecret = process.env.OKX_API_SECRET || "";
const apiPass = process.env.OKX_API_PASS || "";

const restClient = new RestClient({
  apiKey,
  apiSecret,
  apiPass,
});

// ✅ GET /api/okx/balance
export const getBalance = async (req: Request, res: Response) => {
  try {
    const balance = await restClient.getBalance();
     const response = [];
     
      let coinBalance = balance[0].details;
      const totalBalance = balance[0].totalEq
      for (let i = 0; i < coinBalance.length; i++) {
            let val = {};
            val = {
              'currency': coinBalance[i].ccy,
              'balance': coinBalance[i].eq,
              'usdtValue':coinBalance[i].eqUsd,
            }
            response.push(val);
        }

      let resVal = {
        'coins':response,
        'totalBalance':totalBalance
      }
    res.json(balance);
  } catch (err: any) {
    res.status(500).json({ error: err.msg || "Failed to fetch balance" });
  }
};


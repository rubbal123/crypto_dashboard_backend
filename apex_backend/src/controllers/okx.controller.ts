import { Request, Response } from "express";
import { RestClient } from "okx-api";
import dotenv from "dotenv";
import BalanceHistory from "../models/BalanceHistory";
import { Sequelize } from "sequelize";
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
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    const data:any = await BalanceHistory.findOne({
      where: { source:"OKX", date: yesterdayStr },
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("totalBalance")), "totalBalance"],
      ],
      raw: true,
    });
    const yesterTotalBalance = data?.totalBalance
   
    const balance = await restClient.getBalance();
     const response = [];
     
      let coinBalance = balance[0].details;
      const totalBalance:any = balance[0].totalEq
      for (let i = 0; i < coinBalance.length; i++) {
            let val = {};
            val = {
              'coinName': coinBalance[i].ccy,
              'balance': coinBalance[i].eq,
              'usdBalance':coinBalance[i].eqUsd,
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
        'totalBalance':totalBalance,
        'yesterdayStatus':{ percentage: +percentage.toFixed(2), status }
      }
    res.json(resVal);
  } catch (err: any) {
    res.status(500).json({ error: err.msg || "Failed to fetch balance" });
  }
};


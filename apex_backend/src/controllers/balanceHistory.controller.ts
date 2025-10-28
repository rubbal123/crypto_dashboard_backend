import { Request, Response } from "express";
import { Op } from "sequelize";
import BalanceHistory from "../models/BalanceHistory";

export const getBalanceHistory = async (req: Request, res: Response) => {
  try {
    const { filter, source } = req.body; 
    
    const now = new Date();
    let startDate: Date | null = null;

    // 🗓️ Time filter
    switch (filter) {
      case "weekly":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case "monthly":
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "yearly":
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = null;
    }

    // 🔍 Where conditions
    const whereCondition: any = {};

    if (startDate) {
      whereCondition.date = { [Op.gte]: startDate };
    }

    if (source && source.toLowerCase() !== "all") {
      whereCondition.source = source.toLowerCase();
    }

    // 📦 Fetch data
    const balances = await BalanceHistory.findAll({
      where: whereCondition,
      order: [["date", "DESC"]],
    });

    res.status(200).json({ 
      success: true, 
      count: balances.length, 
      data: balances 
    });
  } catch (error: any) {
    console.error("❌ Error fetching balance history:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

import { Request, Response } from "express";
import { Op, Sequelize } from "sequelize";
import BalanceHistory from "../models/BalanceHistory";

export const getBalanceHistory = async (req: Request, res: Response) => {
  try {
    const { filter, source } = req.body; 
    // e.g. { "filter": "monthly", "source": "all" }

    const now = new Date();
    let startDate: Date | null = null;

    // 🗓️ Time filtering
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

    // 🔍 Filter condition
    const whereCondition: any = {};
    if (startDate) whereCondition.date = { [Op.gte]: startDate };

    // ⚙️ Case 1: Specific source (OKX or Safeheron)
    if (source && source.toLowerCase() !== "all") {
      whereCondition.source = source.toLowerCase();

      const balances = await BalanceHistory.findAll({
        where: whereCondition,
        order: [["date", "DESC"]],
      });

      return res.status(200).json({
        success: true,
        source,
        count: balances.length,
        data: balances,
      });
    }

    // ⚙️ Case 2: Source = ALL → combine & sum both
    const combinedData = await BalanceHistory.findAll({
      where: whereCondition,
      attributes: [
        "date",
        [Sequelize.fn("SUM", Sequelize.col("totalBalance")), "totalBalance"],
      ],
      group: ["date"],
      order: [["date", "DESC"]],
    });

    res.status(200).json({
      success: true,
      source: "all",
      count: combinedData.length,
      data: combinedData,
    });
  } catch (error: any) {
    console.error("❌ Error fetching balance history:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

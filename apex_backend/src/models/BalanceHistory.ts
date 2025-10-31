import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const BalanceHistory = sequelize.define(
  "BalanceHistory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    source: {
      type: DataTypes.STRING, // 'OKX' or 'Safeheron'
      allowNull: false,
    },
    totalBalance: {
      type: DataTypes.DECIMAL(20, 8), // ✅ specify precision & scale
      allowNull: false,
    },
    coinData: {
      type: DataTypes.JSONB, // ✅ JSONB is preferred in Postgres
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "BalanceHistories",
  }
);

export default BalanceHistory;

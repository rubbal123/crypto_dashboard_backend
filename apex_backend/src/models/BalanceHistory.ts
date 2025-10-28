import { DataTypes } from "sequelize";
 import { sequelize } from '../config/database';

const BalanceHistory = sequelize.define("BalanceHistory", {
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
    type: DataTypes.STRING,
    allowNull: false,
  },
  coinData: {
    type: DataTypes.JSON, // [{coinName, balance, usdBalance}]
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default BalanceHistory;

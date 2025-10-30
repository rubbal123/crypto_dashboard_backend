import { DataTypes } from "sequelize";
import { sequelize } from '../config/database';

const totalBalance = sequelize.define("totalBalance", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  source: {
    type: DataTypes.STRING, // 'OKX' or 'Safeheron'
    allowNull: false,
  },
  resData: {
    type: DataTypes.JSON, // [{coinName, balance, usdBalance}]
    allowNull: true,
  },
});

export default totalBalance;

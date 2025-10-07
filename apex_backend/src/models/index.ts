import { sequelize } from "../config/database";
import { User } from "./user.model";

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
};

export { connectDb, User };

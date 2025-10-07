import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectDb } from "./models";

const PORT = process.env.PORT || 3000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

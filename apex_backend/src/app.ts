import express from "express";
// import morgan from 'morgan';
import cors from "cors";
// import helmet from 'helmet';
// import userRoutes from './routes/user.route';
import authRoutes from "./routes/auth.route";
import { errorHandler } from "./middlewares/error.middleware";
// import { authenticateToken } from './middlewares/auth.middleware';
import okxRoutes from "./routes/okx.routes";
import safeheronRoutes from "./routes/safeheron.routes";
import balanceHistoryRoutes from "./routes/balanceHistory.route";
import "./crons/dailyBalanceCron.cron";
import "./crons/balanceCron.cron";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "*", // allow all
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);
// app.use('/api/users', authenticateToken, userRoutes);
app.use("/api/v1/okx", okxRoutes);
app.use("/api/v1/safeheron", safeheronRoutes);
app.use("/api/v1/balance", balanceHistoryRoutes);
app.use(errorHandler);

export default app;

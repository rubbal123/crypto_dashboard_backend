import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
// import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import { errorHandler } from './middlewares/error.middleware'
// import { authenticateToken } from './middlewares/auth.middleware';
import okxRoutes from "./routes/okx.routes";
import safeheronRoutes from "./routes/safeheron.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRoutes);
// app.use('/api/users', authenticateToken, userRoutes);
app.use("/api/v1/okx", okxRoutes);
app.use("/api/v1/safeheron", safeheronRoutes);

app.use(errorHandler);

export default app;
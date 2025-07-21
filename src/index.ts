import "reflect-metadata";
import express from 'express';
import dotenv from 'dotenv';
import { Database } from './config/db';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import atmRoutes from './routes/atm.routes';
import { errorHandler } from './middlewares/errorHandler';
import { logger } from './middlewares/logger';

dotenv.config();
const app = express();
app.use(express.json());
app.use(logger);
app.use(express.static(__dirname));

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/atm', atmRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

Database.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  
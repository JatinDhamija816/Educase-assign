import express from 'express';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler.js';
import schoolRoutes from './routes/school.routes.js';

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use('/api/v1/schools', schoolRoutes);

app.use('*', (req, res) => {
  console.warn(`🔍 404 Not Found → ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorHandler);

export default app;

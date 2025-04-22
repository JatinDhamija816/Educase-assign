import dotenv from 'dotenv';
dotenv.config();

import { CONFIG } from './utils/config.js';
import { connectDB } from './db/connectDB.js';
import app from './app.js';

const port = CONFIG.PORT || 5000;

const startServer = async () => {
  try {
    console.log('Connecting to MySQL...');
    connectDB();
    console.log('✅ MySQL connection successful.');

    app.listen(port, () => {
      console.log(`🚀 Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error('❌ Error starting the server:', error.message);
    process.exit(1);
  }
};

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

startServer();

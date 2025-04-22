import mysql from 'mysql2/promise';
import { CONFIG } from '../utils/config.js';

let pool;

const connectDB = () => {
  if (
    !CONFIG.DB.HOST ||
    !CONFIG.DB.USER ||
    !CONFIG.DB.PASSWORD ||
    !CONFIG.DB.NAME
  ) {
    console.error('❌ Missing DB environment variables.');
    process.exit(1);
  }

  pool = mysql.createPool({
    host: CONFIG.DB.HOST,
    user: CONFIG.DB.USER,
    password: CONFIG.DB.PASSWORD,
    port: CONFIG.DB.PORT || 3306,
    database: CONFIG.DB.NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  console.log(`✅ MySQL connection pool created for "${CONFIG.DB.NAME}"`);
};

const gracefulShutdown = (signal) => {
  console.log(`🔴 Received ${signal}, closing MySQL connection pool...`);
  if (pool) {
    pool.end().then(() => {
      console.log('🔴 MySQL pool closed.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

export { connectDB, pool };

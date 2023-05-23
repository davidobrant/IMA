import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect(async (err, connection) => {
  if (err) {
    console.log(err)
  }
  db.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`,
    async (err, result) => {
      if (err) {
        process.exit(1);
      }
      console.log('--- Database created ---');
      process.exit(0);
    }
  );
});


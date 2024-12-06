import mysql, { Pool, PoolOptions } from 'mysql2/promise'

const options: PoolOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}

export const pool: Pool = mysql.createPool(options)

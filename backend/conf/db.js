import mongoose from "mongoose"

export default async function connectDB() {
  const db_uri_str = process.env.DB_URI
  try {
    const conn = await mongoose.connect(db_uri_str, {
      dbName: "sdev255_final",
    })
    console.log(` Connected to Database: ${conn.connection.name}`)
  } catch (error) {
    console.error(" DB connection error:", error.message)
    process.exit(1)
  }
}


import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

const db = () => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log("✅ Mongodb is connected");
      console.log("📂 Mongo name:", mongoose.connection.name);
    })
    .catch((err) => {
      console.error("❌ Error in connecting mongo db:", err.message);
    });
};

export default db;
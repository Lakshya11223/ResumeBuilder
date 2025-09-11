import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from 'cors'
import db from "./src/utils/db.js"
import {authroutes} from "./src/routes/auth.routes.js"
import {resumeroutes} from "./src/routes/Resume.routes.js"
import User from "./src/models/user.models.js"

dotenv.config();
const app = express();
app.use(express.json({limit:'1mb'}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true,limit:'1mb'}))
app.use(cors({
   origin: "http://localhost:5173",  
   methods: ["GET", "POST", "PUT", "DELETE"],
   credentials: true
}));

const port = process.env.PORT || 4000;
db();
app.use("/api/v1/users",authroutes);
app.use("/api/v1/resumes",resumeroutes)
app.get("/api/test-users", async (req, res) => {
  const users = await User.find();
  console.log("🧪 Total users found in DB:", users.length);
  res.json(users);
});
 
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
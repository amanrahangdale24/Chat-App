import express from 'express'
import dotenv from "dotenv"
import authRoutes from "./src/routes/auth.route.js"
import messageRoutes from "./src/routes/message.route.js"
dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 4044;

app.use("/api/auth", authRoutes); 
app.use("/api/message", messageRoutes); 

app.listen(PORT, ()=>{console.log(`server is running on port ${PORT}`)}); 
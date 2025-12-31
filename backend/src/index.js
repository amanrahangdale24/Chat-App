import express from 'express'
import dotenv from "dotenv"
import path from "path";
import cookieParser from "cookie-parser"; 
import cors from "cors";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';
import { app, server } from "./lib/socket.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = ENV.PORT || 4044;

app.use(express.json({ limit: "5mb" })) // for the large Payload error. 
app.use(cors({
    origin:ENV.CLIENT_URL,
    credentials:true
}))
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);



// make ready for deployment 
// setting in a way, where when we run the backend, our frontend will run auto inside the backend. 

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    });
    // any route other than the defined above, will hit the *; 
}


server.listen(PORT, () => { 
    console.log(`server is running on port ${PORT}`) 
    connectDB(); 
}); 

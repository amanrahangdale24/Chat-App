import express from 'express'
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import path from "path";
dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 4044;

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


// make ready for deployment 
// setting in a way, where when we run the backend, our frontend will run auto inside the backend. 

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("/*", (_, res) => {
        res.send(path.join(__dirname, "../frontend/dist/index.html"))
    });
    // any route other than the defined above, will hit the *; 
}

app.listen(PORT, () => { console.log(`server is running on port ${PORT}`) }); 
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import { Server as socketio } from 'socket.io';
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new socketio(server);
const __dirname = path.resolve();


app.set("view engine", "ejs");

// // Serve static files from the public directory
app.use(express.static(path.join(__dirname, "/frontend/public")));

// Middleware setup
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser()); 

// API Routes
app.use("/api/auth", authRoutes);

// Handle Socket.IO connections
io.on("connection", function(socket) {
    console.log("A user connected:", socket.id);

    // Handle incoming location data
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    // Handle user disconnection
    socket.on("disconnect", function() {
        console.log("User disconnected:", socket.id);
        io.emit("user-disconnected", socket.id);
    });
});

// Serve the frontend for production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

// Default route
app.get("/", (req, res) => {
    res.render("index");
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port:", PORT);
});

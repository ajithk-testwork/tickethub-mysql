import express from "express";
import dotenv from "dotenv";
import prisma from "./config/prisma";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes"
import cors from "cors";

dotenv.config();




const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes)


async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ MySQL Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
  }
}

startServer();
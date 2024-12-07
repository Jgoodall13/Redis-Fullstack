import express, { Request, Response, Application } from "express";
import { connectRedis, client } from "./src/config/redisClient"; // Updated import
import { setupMiddlewares } from "./src/middlewares/setupMiddlewares";
import authRoutes from "./src/routes/auth";

const app: Application = express();

// Apply middlewares
setupMiddlewares(app);

// Connect to Redis
connectRedis();

app.get("/", async (req: Request, res: Response) => {
  console.log("in test routeß");
  try {
    const message = await client.get("message");
    res.send({ message });
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Routes
app.use("/auth", authRoutes);

// Graceful shutdown
process.on("SIGINT", async () => {
  await client.quit();
  console.log("Redis client disconnected");
  process.exit(0);
});

export default app;

import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const client = createClient({
  username: "default",
  password: process.env.REDIS_PASS,
  socket: {
    host: "redis-13327.c12.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 13327,
  },
});

client.on("error", (err: any) => {
  console.error("Redis Client Error", err);
});

export const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Redis client connected");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
};

export { client };

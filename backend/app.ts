import express from "express";
import { createClient } from "redis";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

const client = createClient({
  username: "default",
  password: process.env.REDIS_PASS,
  socket: {
    host: "redis-13327.c12.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 13327,
  },
});

client.on("error", (err: any) => console.log("Redis Client Error", err));

client.connect().then(async () => {
  await client.set("foo", "DB connected");
  const result = await client.get("foo");
  console.log(result); // >>> bar
});

app.get("/", async (req, res) => {
  const message = await client.get("message");
  res.send({ message });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

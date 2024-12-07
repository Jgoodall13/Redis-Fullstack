import { createClient } from "redis";

const client = createClient({
  username: "default",
  password: "zOc5vLHUgCHYvzEBrrDTDJPx1mJllYDG",
  socket: {
    host: "redis-13327.c12.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 13327,
  },
});

client.on("error", (err: any) => console.log("Redis Client Error", err));

client.connect().then(async () => {
  await client.set("foo", "bar");
  const result = await client.get("foo");
  console.log(result); // >>> bar
});

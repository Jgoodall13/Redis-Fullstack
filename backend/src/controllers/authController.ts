import { Request, Response } from "express";
import { connectRedis, client } from "../config/redisClient"; // Updated import
import userSchema from "../models/userSchema";

export const createUser = async (req: any, res: any) => {
  try {
    // Validate request body
    const { email, password } = await userSchema.validateAsync(req.body);

    // Store in Redis
    const setUser = await client.set(email, password);

    res.status(201).send({
      message: "User registered successfully",
      email,
      result: setUser, // Typically "OK" for Redis `set`
    });
  } catch (error: any) {
    if (error.isJoi) {
      console.error("Validation Error:", error.details[0].message);
      return res.status(400).send({ message: error.details[0].message });
    }
    console.error("Error storing user in Redis:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

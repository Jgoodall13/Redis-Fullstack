import { Request, Response } from "express";
import { client } from "../config/redisClient"; // Updated import
import userSchema from "../models/userSchema";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validate request body
    console.log(req.body);
    const { email, password } = await userSchema.validateAsync(req.body);

    const userKey = `user:${email}`; // Redis key for the user
    const allUsersKey = "users"; // Redis set for all users

    // Check if the user already exists
    const existingUser = await client.exists(userKey);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Store user data in a hash
    await client.hSet(userKey, {
      email,
      password, // Store plain password here; in production, hash it first
      createdAt: new Date().toISOString(),
    });

    // Add the email to the set of all users
    await client.sAdd(allUsersKey, email);

    res.status(201).json({
      message: "User registered successfully",
      auth: true,
      accessToken: "TestToken",
      user: {
        email,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    if (error.isJoi) {
      console.error("Validation Error:", error.details[0].message);
      res.status(400).json({ message: error.details[0].message });
    } else {
      console.error("Error storing user in Redis:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const userKey = `user:${email}`;

    // Check if the user exists
    const existingUser = await client.exists(userKey);
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Get the user data
    const userData = await client.hGetAll(userKey);
    console.log(userData);

    if (userData.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "User logged in successfully",
      auth: true,
      accessToken: "TestToken",
      user: {
        email,
        createdAt: userData.createdAt,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

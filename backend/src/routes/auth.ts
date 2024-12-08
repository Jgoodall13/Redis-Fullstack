import { Router } from "express";
import { createUser, loginUser } from "../controllers/authController";
import { l } from "vite/dist/node/types.d-aGj9QkWt";

const router = Router();

/**
 * @route POST /auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", createUser);
router.post("/login", loginUser);

export default router;

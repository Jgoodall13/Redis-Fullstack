import { Router } from "express";
import { createUser } from "../controllers/authController";

const router = Router();

/**
 * @route POST /auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", createUser);

export default router;

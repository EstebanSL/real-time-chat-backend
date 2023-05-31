import express from "express";
import { addMessage, getMessages } from "../controllers/messages.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', verifyToken, getMessages)
router.post('/', verifyToken, addMessage)

export default router;
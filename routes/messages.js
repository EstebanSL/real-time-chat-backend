import express from "express";
import { addMessage, getMessages, getRoomMessages } from "../controllers/messages.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', verifyToken, getMessages)
router.get('/room/:id', verifyToken, getRoomMessages)
router.post('/', verifyToken, addMessage)

export default router;
import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { createRoom, deleteRoom, exitRoom, getRoom, getRooms, joinRoom } from "../controllers/rooms.js";

const router = express.Router();

router.get('/', verifyToken, getRooms);
router.get('/room/:id', verifyToken, getRoom);
router.post('/create', verifyToken, createRoom);
router.delete('/delete/:id', verifyToken, deleteRoom);
router.patch('/join/:id', verifyToken, joinRoom);
router.patch('/exit/:id', verifyToken, exitRoom);

export default router;
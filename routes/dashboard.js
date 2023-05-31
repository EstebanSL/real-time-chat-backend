import express from 'express';
import { getSummary } from '../controllers/dashboard.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router()

router.get('/', verifyToken, getSummary)

export default router;

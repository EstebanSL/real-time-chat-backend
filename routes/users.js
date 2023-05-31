import express from "express";
import { addContact, getContacts, getUser, getUsers, removeContact } from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', verifyToken, getUsers);
router.get('/user/:id', verifyToken, getUser);
router.get('/contacts', verifyToken, getContacts);
router.post('/add', verifyToken, addContact);
router.delete('/remove', verifyToken, removeContact);

export default router;
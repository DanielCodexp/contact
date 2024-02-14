import express from 'express';
import { createContact } from '../controllers/ContactController';

const router = express.Router();

router.post('/', createContact);


export default router;

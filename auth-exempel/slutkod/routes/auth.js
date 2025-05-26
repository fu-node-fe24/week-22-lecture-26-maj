import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { validateAuthBody } from '../middlewares/validators.js';
import { registerUser, getUser } from '../services/users.js';

const router = Router();

router.post('/register', validateAuthBody, async (req, res) => {
    const { username, password } = req.body;
    
});

router.post('/login', validateAuthBody, async (req, res) => {
    const { username, password } = req.body;
    
});

export default router;
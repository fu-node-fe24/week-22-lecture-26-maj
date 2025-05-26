import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { validateAuthBody } from '../middlewares/validators.js';
import { registerUser, getUser } from '../services/users.js';
import { comparePasswords, hashPassword, signToken } from '../utils/index.js';

const router = Router();

router.post('/register', validateAuthBody, async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const result = await registerUser({
        username : username,
        password : hashedPassword,
        userId : uuid().substring(0, 5)
    });
    if(result) {
        res.status(201).json({
            success : true,
            message : 'User created successfully'
        });
    } else {
        res.status(400).json({
            success : false,
            message : 'Registration unsuccessful'
        });
    }
});

router.post('/login', validateAuthBody, async (req, res) => {
    const { username, password } = req.body;
    const user = await getUser(username);
    if(user) {
        const correctPassword = await comparePasswords(password, user.password);
        if(correctPassword) {
            const token = signToken({ userId : user.userId });
            res.json({
                success : true,
                message : 'User logged in successfully',
                token : `Bearer ${token}`
            });
        } else {
            res.status(400).json({
                success : false,
                message : 'Username and/or password are incorrect'
            });
        }
    } else {
        res.status(400).json({
            success : false,
            message : 'No user found'
        });
    }
});

export default router;
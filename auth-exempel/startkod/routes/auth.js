import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { validateAuthBody } from '../middlewares/validators.js';
import { registerUser, getUser } from '../services/users.js';

const router = Router();

router.post('/register', validateAuthBody, async (req, res) => {
    const { username, password } = req.body;
    const result = await registerUser({
        username : username,
        password : password,
        userId : uuid().substring(0, 5)
    });
    if(result) {
        res.status(201).json({
            success : true,
            message : 'New user registered successfully'
        });
    } else {
        res.status(400).json({
            success: false,
            message : 'Registration unsuccessful'
        });
    }
});

router.post('/login', validateAuthBody, async (req, res) => {
    const { username, password } = req.body;
    const user = await getUser(username);
    if(user) {
        if(user.password === password) {
            res.json({
                success : true,
                message : 'User logged in successfully'
            });
        } else {
            res.status(400).json({
                success : false,
                message : 'Incorrect username and/or password'
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
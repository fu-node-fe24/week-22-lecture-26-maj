import { Router } from 'express';
import items from '../data/items.js';
import jwt from 'jsonwebtoken';
import { getUserByUserId } from '../services/users.js';

const router = Router();


router.get('/', async (req, res) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.replace('Bearer ', '');
        try {
            const decoded = jwt.verify(token, 'jesper');
            const user = await getUserByUserId(decoded.userId);

            res.json({
                success : true,
                items : items,
                user : user
            });
        } catch(error) {
            res.status(400).json({
                success : false,
                message : error.message
            });
        }
    } else {
        res.status(400).json({
            success : false,
            message : 'No token provided'
        });
    }
})

export default router;
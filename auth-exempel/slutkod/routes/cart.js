import { Router } from 'express';
import items from '../data/items.js';
import { authenticateUser } from '../middlewares/auth.js';
import { verifyToken } from '../utils/index.js';
import { getUserByUserId } from '../services/users.js';
import { getProduct } from '../services/products.js';
import { updateCart } from '../services/cart.js';
import { v4 as uuid } from 'uuid';

const router = Router();


router.get('/', authenticateUser, async (req, res) => {
    res.json(items);
})

router.put('/', async (req, res) => {
    
})

export default router;
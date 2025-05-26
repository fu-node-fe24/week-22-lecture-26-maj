import { Router } from 'express';
import items from '../data/items.js';
import { authenticateUser } from '../middlewares/auth.js';

const router = Router();

router.use(authenticateUser);

router.get('/', async (req, res) => {
    res.json(items);
})

export default router;
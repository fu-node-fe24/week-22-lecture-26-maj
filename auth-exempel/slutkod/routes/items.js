import { Router } from 'express';
import items from '../data/items.js';

const router = Router();


router.get('/', async (req, res) => {
    res.json(items);
})

export default router;
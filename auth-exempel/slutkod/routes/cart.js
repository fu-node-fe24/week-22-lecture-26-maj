import { Router } from 'express';
import items from '../data/items.js';
import { authenticateUser } from '../middlewares/auth.js';
import { verifyToken } from '../utils/index.js';
import { getUser, getUserByUserId } from '../services/users.js';
import { getProduct } from '../services/products.js';
import { updateCart } from '../services/cart.js';
import { v4 as uuid } from 'uuid';

const router = Router();

router.get('/', authenticateUser, async (req, res) => {
    res.json(items);
})

router.put('/', async (req, res) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decodedToken = verifyToken(token);
        console.log(decodedToken);
        
        const user = await getUserByUserId(decodedToken.userId);
        const { prodId, qty } = req.body;
        const product = await getProduct(prodId);

        const result = await updateCart(user.userId, {
            prodId : product.prodId,
            name : product.name,
            price : product.price,
            qty : qty
        });
        res.json({
            success : true,
            cart : result
        });
    } else {
        let { guestId, prodId, qty } = req.body;
        const product = await getProduct(prodId);
        if(!guestId) {
            guestId = `guest-${uuid().substring(0, 5)}`
        }

        const result = await updateCart(guestId, {
            prodId : product.prodId,
            name : product.name,
            price : product.price,
            qty : qty
        });
        res.json({
            success : true,
            guestId : guestId,
            cart : result
        });
    }
})

export default router;
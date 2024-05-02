import express,{Express, Request, Response, Router} from "express";
import user from './user';
import product from './product';
import cart from './cart'
const router: Router = express.Router();

router.use('/user',user);
router.use('/product',product);
router.use('/user/cart', cart)

export default router;
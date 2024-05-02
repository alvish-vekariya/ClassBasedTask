import express, { Express, Request, Response, Router } from "express";
import { addtocart, deleteCart, getAllCart, updateCart } from "../controllers/cartController";
import { checkLogin } from "../middlewares/loginMiddleware";
const router : Router = express.Router();

router.get('/getallcart', checkLogin, getAllCart);
router.post('/addtocart', checkLogin, addtocart);
router.put('/updatecart', checkLogin, updateCart);
router.delete('/deletecart', checkLogin,deleteCart);

export default router;
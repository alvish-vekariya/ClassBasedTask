import express, {Express, Request, Response, Router} from "express";
import { addproduct, deleteproduct, getAllProducts, updateproduct } from "../controllers/productController";
const router : Router = express.Router();

router.get('/getallproducts', getAllProducts);
router.post("/addproduct", addproduct);
router.put('/updateproduct', updateproduct);
router.delete('/deleteproduct', deleteproduct);

export default router;

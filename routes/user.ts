import express, {Express, Request, Response, Router} from "express";
import {loginUser, logoutUser, registerUser} from '../controllers/userController';
import { createprofile, deleteProfile, getAllprofiles, getpdf, updateProfile } from "../controllers/profileController";
import { checkLogin } from "../middlewares/loginMiddleware";

const router: Router = express.Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.post('/createprofile', checkLogin,createprofile);
router.post('/logout', logoutUser);
router.get('/getprofiles', checkLogin,getAllprofiles);
router.delete('/deleteprofile', checkLogin,deleteProfile);
router.put('/updateprofile', checkLogin,updateProfile);
router.get('/getpdf', checkLogin, getpdf);

export default router;
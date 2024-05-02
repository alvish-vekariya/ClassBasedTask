import express, {Express} from "express";
import dotenv from "dotenv";
dotenv.config({path : './config/.env'})
import routes from './routes';
import mongoose from "mongoose";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/',routes)

mongoose.connect(process.env.MONGO_URL as string).then(()=>console.log('Database is connected!')).catch(err=>console.log(err));
const PORT = process.env.PORT as string;
app.listen(PORT, ()=> console.log('server is connected on 3500!!'));
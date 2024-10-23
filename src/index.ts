import express, {Request , Response} from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config()
const app = express(); 

const port = process.env.PORT || 8000; 

app.use(express.json())


app.use('api/routes' , router); 

app.listen(port , ()=>{
    console.log(process.env.PORT)
    console.log(`Running on Port: ${port}`)
})





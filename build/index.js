import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use('api/lead', () => { });
app.use('api/campaign', () => { });
app.listen(port, () => {
    console.log(process.env.PORT);
    console.log(`Running on Port: ${port}`);
});

import express from 'express';
import cors from 'cors';
import { dbConnection } from './DbConfig/DbConfig.js';

const app = express();
const port = 1999


app.use(express.json());
app.use(cors());

app.get('/', (req,res) =>{
    res.send("App Running")
});

dbConnection()

app.listen(port, () =>{
    console.log(`App running on http://localhost:${port} `)
})


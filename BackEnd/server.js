import express from 'express';
import cors from 'cors';
import { dbConnection } from './DbConfig/DbConfig.js';
import { noteRouter } from './Route/noteRoute.js';
import { userRouter } from './Route/userRoute.js';

//config
const app = express();
const port = process.env.PORT || 1999

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/note", noteRouter);
app.use("/api/user", userRouter);

app.get('/', (req,res) =>{
    res.send("App Running")
});

dbConnection()

app.listen(port, () =>{
    console.log(`App running on http://localhost:${port} `)
})


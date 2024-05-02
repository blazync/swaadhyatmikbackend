import express from 'express';
import cors from "cors";
import connect from './database/connection.js';
import userRouter from './routes/userRouter.js';

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.disable('x-powered-by'); // Correct typo in 'x-powered-by'

const port = 4000;

/** HTTP Requests */
app.use(userRouter);

/** Connect to MongoDB */
const startServer = async () => {
    try {
        await connect();
        app.listen(port);
        console.log(`Server connected to http://localhost:${port}`);
    } catch (error) {
        console.log("An error occurred during starting of server", error);
    }
};

startServer();

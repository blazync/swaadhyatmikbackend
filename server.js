import express from 'express';
import cors from "cors";
import connect from './database/connection.js';
import userRoutes from './routes/userRouter.js';
import enquiryRoutes from './routes/enquiryRoute.js'
const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.disable('x-powered-by'); // Correct typo in 'x-powered-by'

const port = 4000;

/** HTTP Requests */
app.use(userRoutes);
app.use(enquiryRoutes);

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

import express from "express";
import chalk from "chalk";
import morgan from "./logger/morgan";
import cookieParser from 'cookie-parser'
import cors from "./cors/cors";
import {connectToMongoDB} from './dataAccess/mongooseConnection'
import usersRouter from './api/users/users.router'
import ordersRouter from './api/orders/orders.router'

connectToMongoDB()

const app = express();
app.use(morgan);
app.use(cors);
app.use(express.json());
app.use(cookieParser());

app.use("/api", usersRouter);
app.use("/api/orders",ordersRouter);



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));
});

import express, {Application, Request, Response} from 'express';
import dotenv from 'dotenv';
import {DBUtil} from "./util/DBUtil";
// import contactRouter from "../Router/grouprouter";
import groupRouter from "./Router/grouprouter";
import Contactrouter from './Router/Contactrouter';
import mongoose  from 'mongoose';
import userrouter from './Router/usersrouter';
const app: Application = express();

// configure express to receive the form data
app.use(express.json());

// configure dot-env
dotenv.config({
    path: "./.env"
});

const port: string | number = process.env.PORT || 9002;
const Host: string | undefined = process.env.Host ;
const dbUrl: string | undefined = process.env.MONGO_DB_CLOUD_URL;
const dbName: string | undefined = process.env.MONGO_DB_DATABASE;

app.get("/", (request: Request, response: Response) => {
    response.status(200);
    response.json({ 
        msg: "Welcome to Express Server"
    });
});

// configure the routers
app.use("/contacts", Contactrouter);
app.use("/groups", groupRouter);
app.use("/user",userrouter)

if (port && Host) {
    app.listen(Number(port),Host, () => {
        if (dbUrl && dbName) {
            console.log(`${dbUrl} - ${dbName}`);
            DBUtil.connectToDB(dbUrl, dbName).then((dbResponse) => {
                console.log(dbResponse);
            }).catch((error) => {
                console.error(error);
                process.exit(0); 
            });
        }
        console.log(`Express Server is started at http://${Host}:${port}`);
    });
}

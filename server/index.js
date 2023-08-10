import express from "express";
import Connection from "./Database/db.js";
import dotenv from "dotenv";
import Router from "./Routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();
app.use(cors());

app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password); //Connecting Database
//  Established server conection
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`server is connected on port no ${PORT} successfully.`);
  });
};
startServer();

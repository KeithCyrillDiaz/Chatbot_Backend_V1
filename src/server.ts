
import express from "express";
import cors from 'cors';
import compression from 'compression';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import http from 'http';
import colors from 'colors';
import errorHandler from "./utility/errorHandler";
import { logger } from "./utility/logger";
import { connectToMongoDB } from "./config/mongoDb";
import router from "./routes";

colors.enable();

const app = express();

app.use(express.json());

app.use(cors({
    credentials: true
}))

app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());

const server  = http.createServer(app);
const port = 7000;

server.listen(port, () => logger.ready(`Server running on http://localhost:${port}`));

app.get("/gemini", (req, res) => {res.json("Gemini backend")});

app.use("/gemini", router());

connectToMongoDB("Local");

app.use(errorHandler);



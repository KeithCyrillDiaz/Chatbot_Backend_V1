
import express from "express";
import cors from 'cors';
import compression from 'compression';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import http from 'http';

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

server.listen(port, () => console.log(`Server running on http://localhost:${port}`));

app.get("/gemini_v1", (req, res) => {res.json("Gemini_V1 backend")});



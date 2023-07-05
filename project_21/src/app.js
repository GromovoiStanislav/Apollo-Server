import express from 'express';
import path from "node:path";
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


export const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Go to /graphql"));

app.use(express.static(path.join(__dirname, "../uploads")));

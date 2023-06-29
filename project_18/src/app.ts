import express from 'express'
import songsRouter from './routes/songs.routes.js'

const app = express();

app.use(express.json())

app.use('/songs', songsRouter)

app.get("/", (req, res) => {
    res.send("Welcome to my api");
});

export default app;
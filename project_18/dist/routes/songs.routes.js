import { Router } from "express";
import { songModel as Song } from "../models/index.js";
const router = Router();
router.get("/", async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
});
router.get("/:id", async (req, res) => {
    res.json({
        message: "get song",
    });
});
router.post("/", (req, res) => {
    res.json({
        message: "create song",
    });
});
router.put("/:id", (req, res) => {
    res.send("updating song");
});
router.delete("/:id", (req, res) => res.json({
    message: "delete song",
}));
export default router;

const express = require("express");
const multer = require("multer");
const File = require("../models/File");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage, fileFilter: (req, file, cb) => {
    const validTypes = ["image/jpeg", "image/png", "video/mp4"];
    cb(null, validTypes.includes(file.mimetype));
}});

// Upload File
router.post("/upload", verifyToken, upload.single("file"), async (req, res) => {
    const { tags } = req.body;
    try {
        const newFile = new File({
            userId: req.user.id,
            fileName: req.file.filename,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            tags: tags ? tags.split(",") : [],
        });
        await newFile.save();
        res.status(201).json(newFile);
    } catch (err) {
        res.status(500).json({ error: "File upload failed!" });
    }
});

// Get Files
router.get("/", verifyToken, async (req, res) => {
    try {
        const files = await File.find({ userId: req.user.id });
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch files!" });
    }
});

module.exports = router;

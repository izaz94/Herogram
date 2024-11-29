const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileType: { type: String, required: true },
    tags: [String],
    viewCount: { type: Number, default: 0 },
    sharedLink: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("File", FileSchema);

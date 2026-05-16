const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    category: { type: String },
    date: { type: String },
    time: { type: String },
    views: { type: Number, default: 0 },
    image: { type: String },
    author: { type: String },
    tags: [String],
}, { timestamps: true });

module.exports = mongoose.model("News", NewsSchema);
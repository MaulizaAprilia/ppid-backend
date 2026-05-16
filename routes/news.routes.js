const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // multer config
const { incrementViews } = require("../controllers/news.controller");
const {
    createNews,
    getAllNews,
    deleteNewsById,
    updateNews,
} = require("../controllers/news.controller");

router.get("/", getAllNews);
router.post("/", upload.single("image"), createNews);
router.put("/:id", upload.single("image"), updateNews);
router.delete("/:id", deleteNewsById);
router.put("/:id/views", incrementViews);

module.exports = router;
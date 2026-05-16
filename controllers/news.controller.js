const News = require("../models/news.model");

// CREATE
const createNews = async (req, res) => {
  try {
    const { title, excerpt, content, category, date, time, author } = req.body;
    let { tags } = req.body;
    const image = req.file?.filename;

    // Parse tags safely
    if (typeof tags === "string") {
      try {
        tags = JSON.parse(tags);
      } catch (err) {
        tags = tags.split(",").map((tag) => tag.trim());
      }
    }

    const newNews = new News({
      title,
      excerpt,
      content,
      category,
      date,
      time,
      author,
      tags,
      image: image ? `${req.protocol}://${req.get("host")}/uploads/${image}` : "", // full URL
    });

    await newNews.save();
    res.status(201).json({ message: "Berita berhasil ditambahkan", data: newNews });
  } catch (error) {
    console.error("Create News Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// READ ALL
const getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    res.status(200).json(newsList);
  } catch (error) {
    console.error("Get All News Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    await News.findByIdAndDelete(id);
    res.status(200).json({ message: "Berita berhasil dihapus" });
  } catch (error) {
    console.error("Delete News Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, category, date, time, author } = req.body;
    let { tags } = req.body;
    const image = req.file?.filename;

    if (typeof tags === "string") {
      try {
        tags = JSON.parse(tags);
      } catch (err) {
        tags = tags.split(",").map((tag) => tag.trim());
      }
    }

    const updatedFields = {
      title,
      excerpt,
      content,
      category,
      date,
      time,
      author,
      tags,
    };

    if (image) {
      updatedFields.image = `${req.protocol}://${req.get("host")}/uploads/${image}`;
    }

    const updatedNews = await News.findByIdAndUpdate(id, updatedFields, { new: true });
    res.status(200).json({ message: "Berita berhasil diperbarui", data: updatedNews });
  } catch (error) {
    console.error("Update News Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// INCREMENT VIEWS
const incrementViews = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedNews = await News.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } }, // tambah 1 views
      { new: true }           // kembalikan data setelah diupdate
    );

    if (!updatedNews) {
      return res.status(404).json({ error: "Berita tidak ditemukan" });
    }

    res.status(200).json(updatedNews);
  } catch (error) {
    console.error("Increment Views Error:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createNews,
  getAllNews,
  deleteNewsById,
  updateNews,
  incrementViews,
};
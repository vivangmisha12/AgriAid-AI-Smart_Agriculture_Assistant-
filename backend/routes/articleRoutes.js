import express from "express";
import Article from "../models/Article.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import cloudinary from "../utils/cloudinary.js";
import upload from "../middleware/multer.js";
import fs from "fs";

const router = express.Router();

// @desc    Fetch all articles
// @route   GET /api/articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new article
// @route   POST /api/articles
router.post("/", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const { title, category, author, readTime, excerpt, tags, url } = req.body;
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "articles",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // Remove local file
    }

    const newArticle = new Article({
      title,
      category,
      author,
      readTime,
      excerpt,
      tags: typeof tags === 'string' ? tags.split(",").map(t => t.trim()) : tags,
      imageUrl,
      url
    });

    const savedArticle = await newArticle.save();
    res.status(201).json({ article: savedArticle });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update an article
// @route   PUT /api/articles/:id
router.put("/:id", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "articles",
      });
      updateData.imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(",").map(t => t.trim());
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedArticle) return res.status(404).json({ message: "Article not found" });
    res.json({ article: updatedArticle });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete all articles
// @route   DELETE /api/articles/clear-all
router.delete("/clear-all", protect, adminOnly, async (req, res) => {
  try {
    await Article.deleteMany({});
    res.json({ message: "All articles deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete an article
// @route   DELETE /api/articles/:id
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

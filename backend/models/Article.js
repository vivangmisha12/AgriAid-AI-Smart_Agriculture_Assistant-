import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  readTime: { type: String, required: true },
  excerpt: { type: String, required: true },
  tags: [{ type: String }],
  imageUrl: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Article = mongoose.model("Article", articleSchema);
export default Article;

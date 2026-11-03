const express = require("express");
const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");

const router = express.Router();

function requireLogin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Please log in first." });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Your session has expired. Please log in again." });
  }
}

// Retrieve all blog posts from MongoDB
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch {
    res.status(500).json({ message: "Could not retrieve blog posts." });
  }
});

// Retrieve one blog post for the details page
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) return res.status(404).json({ message: "Blog post not found." });
    res.json(blog);
  } catch {
    res.status(400).json({ message: "Invalid blog ID." });
  }
});

// Save a blog post in MongoDB (login required)
router.post("/", requireLogin, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const blog = await Blog.create({
      title: title.trim(),
      content: content.trim(),
      author: req.user.userId
    });
    const savedBlog = await blog.populate("author", "name");
    res.status(201).json(savedBlog);
  } catch {
    res.status(500).json({ message: "Could not save blog post." });
  }
});

module.exports = router;
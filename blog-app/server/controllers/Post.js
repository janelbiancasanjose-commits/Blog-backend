const Post = require("../models/Post")

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 })
  res.json(posts)
}

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.json(post)
}

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: {
        userId: req.user.id,
        username: req.user.username
      }
    })

    res.status(201).json({
      message: "Blog post created successfully",
      post
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    if (post.author.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed to update this post" })
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.status(200).json({
      message: "Blog post updated successfully",
      post: updatedPost
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  res.json({ message: "Post deleted" })
}

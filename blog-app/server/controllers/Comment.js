const Comment = require("../models/Comment")

exports.getCommentsByPost = async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId })
  res.json(comments)
}

exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    postId: req.body.postId,
    comment: req.body.comment,
    user: {
      userId: req.user.id,
      username: req.user.username
    }
  })

  res.status(201).json({
    message: "Comment successfully added",
    comment
  })
}

exports.deleteComment = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id)
  res.json({ message: "Comment has been removed" })
}

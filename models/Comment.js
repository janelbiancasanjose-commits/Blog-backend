const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  user: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: String
  },
  comment: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Comment", commentSchema)

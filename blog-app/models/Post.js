const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: String
  },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Post", postSchema)

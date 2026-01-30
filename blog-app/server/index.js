const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(express.json())

app.use(cors({
    origin: "*"
}));

const userRoutes = require("./routes/User.js")
const postRoutes = require("./routes/Post.js")
const commentRoutes = require("./routes/Comment.js")

app.use("/users", userRoutes)
app.use("/posts", postRoutes)
app.use("/comments", commentRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));


if (require.main === module) {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${process.env.PORT || 4000}`);
    });
}

module.exports = { app, mongoose };
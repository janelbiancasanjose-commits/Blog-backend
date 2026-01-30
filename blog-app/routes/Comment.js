const router = require("express").Router()
const auth = require("../auth")
const commentController = require("../controllers/Comment")

router.get("/:postId", commentController.getCommentsByPost)
router.post("/", auth.verify, commentController.addComment)
router.delete("/:id", auth.verify, auth.verifyAdmin, commentController.deleteComment)

module.exports = router

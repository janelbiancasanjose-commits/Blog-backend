const router = require("express").Router()
const auth = require("../auth")
const postController = require("../controllers/Post")

router.get("/", postController.getAllPosts)
router.get("/:id", postController.getPostById)

router.post("/", auth.verify, postController.createPost)
router.put("/:id", auth.verify, postController.updatePost)
router.delete("/:id", auth.verify, auth.verifyAdmin, postController.deletePost)

module.exports = router

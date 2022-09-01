// External requires
const express = require("express");

// Importing middlewares
const multer = require("../middleware/multer-posts");
const auth = require("../middleware/authentification")

// Importing methods for post
const {
    createPost,
    getAllPost,
    getOnePost,
    updatePost,
    deletePost,
    likePost
} = require('../controllers/postController')

// Creating express Router
const router = express.Router();

// Routing for sauces
router.post("/", auth, multer, createPost);
router.get("/",auth, getAllPost);
router.get("/:id", auth, getOnePost);
router.put("/:id", auth, multer, updatePost);
router.delete("/:id", auth, multer, deletePost);
router.post("/:id/like", auth, likePost);

module.exports = router;

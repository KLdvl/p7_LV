// Model used
const Post = require("../../models/Post");
const User = require("../../models/User");

// External requires
const fs = require("fs");

// Method for modifying an existing post
exports.updatePost = async (req, res) => {
  try {
    const user = await User.findById({_id: req.auth.userId});
    const post = await Post.findById({_id: req.params.id})

// destructuring req.body
    const {message, userId} = req.body;

    if(userId !== post.userId && user.role !== "Admin") {
      return res.status(401).json({message: "requête non autorisée"})
    }

     // Check if file is updated and delete old one if existing
    if(req.file) {
      const post = await Post.findById({_id: req.params.id}).exec();
      const {postPicture} = post
      const filename = postPicture.split('/images/images-posts/')[1];
      fs.unlink(`images/images-posts/${filename}`, (err) => {})
    }

    // Populate new object with new image or new datas
    const postObject = req.file
      ? {
        ...req.body,
        postPicture: `${req.protocol}://${req.get("host")}/images/images-posts/${
          req.file.filename
        }`,
      }
      : {
        message: message,
        userId: userId,
      };

// Update post data or image
    await Post.findByIdAndUpdate({_id: req.params.id}, {
      ...postObject,
      _id: req.params.id,
      date: Date.now()
    })
    await res.status(200).json({message: "Post modifié !"})

} catch(err) {
  await res.status(400).json({error: err})
}
}

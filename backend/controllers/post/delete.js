// Model used
const Post = require("../../models/Post");
const User = require("../../models/User");

// External requires
const fs = require("fs");

// Method for deleting a post
exports.deletePost = async (req, res) => {
  try {
    const user = await User.findById({_id: req.auth.userId});

    const post = await Post.findById({_id: req.params.id}).exec();
    const {userId, postPicture} = post;
    if (!post) {
      return res.status(404).json({message: "Post non trouvé"})
    }
    if(userId !== req.auth.userId && user.role !== "Admin") {
      return res.status(401).json({message: "Requête non autorisée"})
    }
    const filename = postPicture.split('/images/images-posts/')[1];

     fs.unlink(`images/images-posts/${filename}`, (err) => {});

    await Post.findByIdAndDelete({_id: req.params.id });
    await res.status(200).json({message: "Post supprimé !"})

  } catch(err) {
      await res.status(500).json({error: err})
    }
}

// Model used
const Post = require("../../models/Post");

// Method for creating a new post
exports.createPost = async (req, res) => {
  try {
    const postObject = req.file ? {...req.body,
      postPicture: `${req.protocol}://${req.get('host')}/images/images-posts/${req.file.filename}`,
    date: Date.now()} : {...req.body, date: Date.now()};
    delete postObject._id;

    await Post.create({
      ...postObject,
    })
    await res.status(201).json({message: "Post créé !"})
  } catch(err) {
    await res.status(400).json({error : err})
  }
}

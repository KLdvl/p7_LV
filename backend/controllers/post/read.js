// Model used
const Post = require("../../models/Post");

// Method for getting all the sauces
exports.readPost = async (req, res) => {
  try {
    const post = await Post.find({}).sort({date: -1}).exec()
    await res.status(200).json(post);
  } catch(err) {
    await res.status(500).json({error : err})
  }
}

// Method for getting one post selected by Id
exports.readOnePost = async (req, res) => {
  try {
    const post = await Post.findById({_id: req.params.id}).exec();
    await res.status(200).json(post)
  } catch(err) {
    await res.status(404).json({error: err})
  }
}

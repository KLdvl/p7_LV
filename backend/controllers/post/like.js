const Post = require('../../models/Post')

exports.likePost = async (req, res) => {
    try {
        // Destructuring
        const {like, userId} = req.body;
        // Find post that needs to be updated
        const post = await Post.findById({_id: req.params.id})
        // Using switch to handle all the cases
        const { likes, dislikes, usersLiked, usersDisliked } = post
        switch (like) {
            // If like === 1
            case 1:
                if (!post.usersLiked.includes(userId) && !post.usersDisliked.includes(userId)) {
                    await Post.findByIdAndUpdate({_id: req.params.id}, {$inc: {likes: +1}, $push: {usersLiked: userId}})
                    await res.status(200).json({message: "Je like ce post" , likes, usersLiked })
                }
                break;
            // If like === 0
            case 0:
                if (post.usersLiked.includes(userId)) {
                    await Post.findByIdAndUpdate({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: userId}})
                    await res.status(200).json({message: "Je retire mon like", likes, usersLiked})
                }
                if (post.usersDisliked.includes(userId)) {
                    await Post.findByIdAndUpdate({_id: req.params.id}, {
                        $inc: {dislikes: -1},
                        $pull: {usersDisliked: userId}
                    })
                    await res.status(200).json({message: "Je retire mon dislike", dislikes, usersDisliked})
                }
                break;
            // If like === -1
            case -1:
                if (!post.usersDisliked.includes(userId) && !post.usersLiked.includes(userId)) {
                    await Post.findByIdAndUpdate({_id: req.params.id}, {
                        $inc: {dislikes: +1},
                        $push: {usersDisliked: userId}
                    })
                    await res.status(200).json({message: "Je dislike ce post", dislikes, usersDisliked})
                }
                break;
        }
    } catch (err) {
        await res.status(400).json({error: err})
    }
}
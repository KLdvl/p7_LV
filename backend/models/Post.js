const mongoose = require('mongoose');
const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

//creation du schema mongoose pour les posts
const PostSchema = mongoose.Schema({
    userId: { type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]}
});
PostSchema.plugin(mongooseErrorHandler);

//model qui permet d'inserer des données dans mongoDB selon le schema pour les posts

module.exports = mongoose.model('Post', PostSchema);


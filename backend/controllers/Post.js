const Post = require('../models/Post');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    const PostObject = JSON.parse(req.body.Post)
    deletePosteObject._id; //retire l'id généré par la base de données
    const Post = new Post({
        ...PostObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    Post.save() //cette methode enregistre dans la BDD
        .then(() => res.status(201).json({message: 'Post enregistré !'}))
        .catch(error => res.status(400).json({error}));
};

exports.modifyPost = (req, res, next) => {
    const PostObject = req.file ? // s'il y a un req.file c'est qu'il y a ajout d'un fichier image
        {
            ...JSON.parse(req.body.Pos),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body}; //ici le cas où il n'y a pas d'ajout d'image
    Post.updateOne({_id: req.params.id}, {...PostObject, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({error}));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then(Post => {
            const filename = Post.imageUrl.split('/images/')[1]; //Extrait le nom du fichier à supprimer
            fs.unlink(`images/${filename}`, () => {   //supression grace à fs.unlink
                Post.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: 'Objet supprimé !'}))
                    .catch(error => res.status(400).json({error}));
            });
        })
        .catch(error => res.status(500).json({error}))

};

exports.getOnePos = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then(Post => res.status(200).json(Post))
        .catch(error => res.status(404).json({error}));
};

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then(Posts => res.status(200).json(Posts))
        .catch(error => res.status(400).json({error}));
};

exports.likePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then((Post) => {
            //like=1
            if (!Post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                console.log("userId n'est pas dans la BDD et la requete front est = 1")
                //mise à jour de la BDD
                PostsupdateOne(
                    {_id: req.params.id},
                    {
                        $inc: {likes: 1},
                        $push: {usersLiked: req.body.userId}
                    }
                )
                    .then(() => res.status(201).json({message: "Post like +1"}))
                    .catch((error) => res.status(400).json({error}));

            }
//like = 0, pas de vote
            if (Post.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                console.log("userId est dans usersLiked et like =0")

                //mise à jour de la BDD
                Post.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {likes: -1},
                        $pull: {usersLiked: req.body.userId}
                    }
                )
                    .then(() => res.status(201).json({message: "Post like 0"}))
                    .catch((error) => res.status(400).json({error}));
            }
            //like = -1
            if (!Post.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                console.log(" userId n'est pas dans UsersDisliked et dislikes +1")
                //mise à jour de la BDD
                Post.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {dislikes: 1},
                        $push: {usersDisliked: req.body.userId}
                    }
                )
                    .then(() => res.status(201).json({message: "Post dislike 1"}))
                    .catch((error) => res.status(400).json({error}));
            }
            //après un dislike on met un like =0, on enlève le dislike
            if (Post.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                console.log(" userId est dans UsersDisliked et like = 0")
                //mise à jour de la BDD
                Post.updateOne(
                    {_id: req.params.id},
                    {
                        $inc: {dislikes: -1},
                        $pull: {usersDisliked: req.body.userId}
                    }
                )
                    .then(() => res.status(201).json({message: "Post dislike = 0"}))
                    .catch((error) => res.status(400).json({error}));
            }
        })
        .catch((error) => res.status(404).json({error}));

};
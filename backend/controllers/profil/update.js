// Model used
const Profil = require("../../models/Profil");
const User = require("../../models/User");

// External requires
const fs = require("fs");

// Method for modifying an existing profil
exports.updateProfil = async (req, res) => {
    try {

        const user = await User.findById({_id: req.auth.userId});
        const profil = await Profil.findOne({userId: req.body.userId})

// destructuring req.body
        const {title, content, userId} = req.body;

        if(userId !== profil.userId && user.role !== "Admin") {
            return res.status(401).json({message: "requête non autorisée"})
        }

        // Check if file is updated and delete old one if existing
        if(req.file) {
            const profil = await Profil.findOne({userId: req.body.userId}).exec();
            const {profilPicture} = profil
            const filename = profilPicture.split('/images/images-profils/')[1];
            fs.unlink(`images/images-profils/${filename}`, (err) => {})
        }

        // Populate new object with new image or new datas
        const profilObject = req.file
            ? {
                ...req.body,
                profilPicture: `${req.protocol}://${req.get("host")}/images/images-profils/${
                    req.file.filename
                }`,
            }
            : {
                title: title,
                content: content,
                userId: userId,
            };

// Update profil data or image
        await Profil.findOneAndUpdate({userId: req.body.userId}, {
            ...profilObject,
        })
        await res.status(200).json({message: "Profil modifié !"})

    } catch(err) {
        await res.status(400).json({error: err})
    }
}

// Model used
const Profil = require("../../models/Profil");

// Method for creating a new post
exports.createProfil = async (req, res) => {
    try {
        const profilObject = req.file ? // s'il y a un req.file c'est qu'il y a ajout d'un fichier image
            {
                ...req.body,
                profilPicture: `${req.protocol}://${req.get('host')}/images/images-profils/${req.file.filename}`
            } : {...req.body};
        delete profilObject._id;

        await Profil.create({
            ...profilObject,
        })
        await res.status(201).json({message: "Profil créé !"})
    } catch(err) {
        await res.status(400).json({error : err})
    }
}

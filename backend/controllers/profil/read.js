// Model used
const Profil = require("../../models/Profil");

// Method for getting one post selected by Id
exports.readOneProfil = async (req, res) => {
    try {
        const profil = await Profil.findOne({userId: req.params.id}).exec();
        await res.status(200).json(profil)
    } catch(err) {
        await res.status(404).json({error: err})
    }
}

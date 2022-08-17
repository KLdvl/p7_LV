const mongoose = require('mongoose');
const URL= "http://localhost:5000/images/images-profils/profil-default.jpg";

const profilSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    prenom: {type: String, required: true},
    nom: {type: String, required: true},
    profilPicture: {type: String, default: URL},
    bio: {type: String}
});

module.exports = mongoose.model('Profil', profilSchema);

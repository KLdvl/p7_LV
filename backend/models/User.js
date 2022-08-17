// External requires
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const URL= "http://localhost:5000/images/images-profils/profil-default.jpg";

// Schema for a user using mongoose
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Veuillez renseigner une adresse email"],
    unique: [true, "L'adresse email est déjà utilisée"],
  },
  password: { type: String,
    required: [true, "Veuillez renseigner un mot de passe"] },
  role: { type: String, required: true, default: "User"},
  profilPicture: {type: String, default: URL},
  userName: {type: String, default: ""}
});

// Verifying if unique with plugin
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

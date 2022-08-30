// External requires
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const URL= "http://localhost:5000/images/profil-default.jpg";

// Schema for a user using mongoose
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Veuillez renseigner une adresse email"],
    unique: [true, "L'adresse email est déjà utilisée"],
  },
  password: { type: String,
    required: [true, "Veuillez renseigner un mot de passe"] },
  isAdmin: { type: Boolean, required: true, default: false},
  profilPicture: {type: String, default: URL},
  lastName: {type: String, default: ""},
  firstName: {type: String, default: ""}
});

// Verifying if unique with plugin
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

// External requires
const express = require("express");

// Importing middlewares
const multer = require("../middleware/multer-profils");
const auth = require("../middleware/authentification")

// Importing methods for post
const {createProfil} = require("../controllers/profil/create");
const {readOneProfil} = require("../controllers/profil/read");
const {updateProfil} = require("../controllers/profil/update");

// Creating express Router
const router = express.Router();

// Routing for sauces
router.post("/", auth, multer, createProfil);
router.get("/:id", auth, readOneProfil);
router.put("/", auth, multer, updateProfil);

module.exports = router;

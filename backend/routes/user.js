// External requires
const express = require("express");
const bouncer = require("express-bouncer")(30000, 120000, 3)

// Importing middleware
const passwordValidator = require("../middleware/validators/passwordValidator");
const emailValidator = require("../middleware/validators/emailValidator");
const auth = require("../middleware/authentification")
const multer = require("../middleware/multer-profils");

// Importing methods for users
const {
    signUp,
    logIn,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
} = require("../controllers/userController")

// Creating express Router
const router = express.Router();

// Custom error message for bouncer
bouncer.blocked = function (req, res, next, remaining) {
    res.status(429).json({message: "Too many requests have been made. Please wait " + remaining / 1000 + " seconds."});
};

// Routing for users
router.post("/signup", passwordValidator, emailValidator, signUp);
router.post("/login", bouncer.block, emailValidator, logIn);
router.get('/', auth, getAllUsers)
router.get('/:id', auth, getOneUser)
router.put('/:id', auth, multer, updateUser)
router.delete('/:id', auth, multer, deleteUser)

// Exportation of module router
module.exports = router;

const router = require("express").Router();
const authCtrl = require("../controllers/authCtrl");

router.post("/register", authCtrl.register);

//admin
router.post("/registerAdmin", authCtrl.registerAdmin);
router.post("/loginAdmin", authCtrl.loginAdmin);

//admin

router.post("/login", authCtrl.login);

router.post("/logout", authCtrl.logout);

router.post("/refresh_token", authCtrl.generateAccessToken);

module.exports = router;

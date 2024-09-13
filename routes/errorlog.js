const express = require("express");
const router = express.Router();
const { errorsave, errorget } = require("../controllers/errorlog");

router.post("/errorsave", errorsave);
router.get("/errorget", errorget);

module.exports = router;

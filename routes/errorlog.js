const express = require("express");
const router = express.Router();
const { errorsave, errorget } = require("../controllers/errorlog");

router.post("/storage", errorsave);
router.get("/", errorget);

module.exports = router;

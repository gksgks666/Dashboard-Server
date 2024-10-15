const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  register,
  refresh,
  protected,
} = require("../controllers/userauth");

router.post("/login", login);
router.delete("/logout", logout);
router.post("/register", register);
router.put("/refresh", refresh);
router.get("/protected", protected);

module.exports = router;

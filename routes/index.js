const express = require("express");
const router = express.Router();
const verifyAccessToken = require("../middleware/auth");

// 일부 api호출을 제외한 모든 api호출은 verifyAccessToken 미들웨어를 통해 accessToken 인증 필요
router.use("/api", (req, res, next) => {
  if (
    [
      "/userauth/login",
      "/userauth/register",
      "/userauth/logout",
      "/errorlog/storage",
    ].includes(req.path)
  ) {
    return next();
  }
  verifyAccessToken(req, res, next);
});

// route
router.use("/api/general", require("./general"));
router.use("/api/management", require("./management"));
router.use("/api/statistics", require("./statistics"));
router.use("/api/errorlog", require("./errorlog"));
router.use("/api/userauth", require("./userauth"));

module.exports = router;

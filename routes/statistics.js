const express = require("express");
const router = express.Router();
const { getStatistics } = require("../controllers/statistics");

router.get("/statistics", getStatistics);

module.exports = router;

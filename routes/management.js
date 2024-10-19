const express = require("express");
const router = express.Router();
const {
  getUserList,
  saveRole,
  getCustomerList,
  saveCustomerAccount,
} = require("../controllers/management");

router.get("/userlist", getUserList);
router.post("/role", saveRole);
router.get("/customerlist", getCustomerList);
router.post("/customeraccount", saveCustomerAccount);

module.exports = router;

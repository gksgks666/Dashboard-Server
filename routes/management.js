const express = require("express");
const router = express.Router();
const {
  getUserList,
  saveRole,
  getCustomerList,
  saveCustomerAccount,
} = require("../controllers/management");

router.get("/getuserlist", getUserList);
router.post("/rolechange", saveRole);
router.get("/getcustomerlist", getCustomerList);
router.post("/customeraccountchange", saveCustomerAccount);

module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const { ensureAuthenticated } = require("../../config/auth");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
// const { sendSMS, apiLog, makeid, convertCurrency } = require("../functions.js");
const { Users } = require("../../models");
const path = require("path");
const { DateTime } = require("luxon");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    console.log("ssss");
    res.json({ success: true });
  } catch (err) {
    apiLog(req.ip, req.body, err, "error", req.path, req.user.name);
    res.json({ success: false, msg: err });
  }
});

module.exports = router;

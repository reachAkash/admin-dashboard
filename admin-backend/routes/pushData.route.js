const express = require("express");
const router = express.Router();
const { PushData } = require("../controllers/pushData.controller.js");

router.get("/push", PushData);

module.exports = router;

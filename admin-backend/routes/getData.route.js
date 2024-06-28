const express = require("express");
const router = express.Router();
const { getDataController } = require("../controllers/getDataController.js");

router.get("/getdata", getDataController);

module.exports = router;

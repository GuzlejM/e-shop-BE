const express = require("express");
const router = express.Router();
const { saveToCollection } = require("./categories");

router.route("/categories").post(saveToCollection);

module.exports = router;

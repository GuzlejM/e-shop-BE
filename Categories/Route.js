const express = require("express");
const router = express.Router();
const { addCategory } = require("./categories");

router.route("/categories").post(addCategory);

module.exports = router;

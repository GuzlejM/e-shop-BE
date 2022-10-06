const express = require("express");
const router = express.Router();
const { getCategories } = require("./categories");

router.route("/categories").get(getCategories);

module.exports = router;

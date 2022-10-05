const express = require("express");
const router = express.Router();
const { getCategories } = require("./category");

router.route("/shop").get(getCategories);

module.exports = router;

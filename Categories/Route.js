const express = require("express");
const router = express.Router();
const { createCategory } = require("./categories");

router.route("/categories").post(createCategory);

module.exports = router;

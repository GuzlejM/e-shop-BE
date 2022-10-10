const express = require("express");
const router = express.Router();
const { createCategory, getAllCategories } = require("./categories");

router.route("/categories").post(createCategory);
router.route("/").get(getAllCategories);

module.exports = router;

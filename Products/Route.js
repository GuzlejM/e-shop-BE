const express = require("express");
const router = express.Router();
// const { adminAuth } = require("../middleware/auth");
const { createCategory } = require("./products");

//TODO add adminAuth/ADMIN PAGE FFS !
router.route("/create_category").post(createCategory);

module.exports = router;

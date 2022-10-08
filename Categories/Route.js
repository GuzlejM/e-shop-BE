const express = require("express");
const router = express.Router();
const { createTestCollection } = require("./categories");

router.route("/categories").post(createTestCollection);

module.exports = router;

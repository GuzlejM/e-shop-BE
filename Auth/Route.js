const express = require("express");
const router = express.Router();
const { adminAuth } = require("../middleware/auth");
const {
  deleteUser,
  login,
  register,
  sendResetPassword,
  updateRole,
  updatePassword,
} = require("./auth");

router.route("/deleteUser").delete(deleteUser);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/reset_password").post(sendResetPassword);
router.route("/reset_password/:id/:token").put(updatePassword);
router.route("/update").put(update);

router.route("/updateRole").put(adminAuth, updateRole);
router.route("/deleteUser").delete(adminAuth, deleteUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  adminAuth,
  deleteUser,
  login,
  register,
  sendResetPassword,
  updateRole,
} = require("./auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/reset_password").post(sendResetPassword);

router.route("/updateRole").put(adminAuth, updateRole);
router.route("/deleteUser").delete(adminAuth, deleteUser);

module.exports = router;

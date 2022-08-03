const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const resetPassword = require("../utils/resetPassword");
const Token = require("../model/Token");
const User = require("../model/User");

const jwtSecret = process.env.JWT_SECRET;

// -------------------- DELETE - LOGIN - REGISTER - RESET PASSWORD - UPDATE ---------------------

// ------------------ Delete user ------------------
exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  await User.findById(id)
    .then((user) => user.remove())
    .then((user) =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};
// ------------------ LOGGED IN ------------------
exports.isLoggedIn = (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.json(false);
    jwt.verify(token, jwtSecret);
    console.log(req);
    res.send(true);
  } catch (err) {
    res.json(false);
  }
  // } else {
  //   return res
  //     .status(401)
  //     .json({ message: "Not authorized, token not available" });
  // }
};

// ------------------ LOGIN ------------------
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if username and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Email or Password not present",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, email, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          // email verification
          if (user.verified === false) {
            return res.status(400).json({
              message:
                "Your email adress is not verified. Verify before logging in.",
            });
          } else {
            res.status(201).json({
              message: "User successfully Logged in",
              user: user._id,
              auth: token,
            });
          }
        } else {
          res.status(400).json({ message: "Login not succesful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

// ------------------ Register a new user ------------------
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      email,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user._id, username, role: user.role },
          jwtSecret,
          {
            expiresIn: maxAge, // 3hrs in sec
          }
        );
        // SEND EMAIL VERIFICATION ON REGISTRATION
        const url = `${process.env.BASE_URL}/verify/${user._id}/${token}`;
        sendEmail(email, "Email Verification", url);

        res.cookie("jwt", token, {
          httpOnly: false,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(201).json({
          message: "An Email sent to your account",
          user: user._id,
        });
      })
      .catch((error) =>
        res.status(401).json({
          message: "User not successful created",
          error: error.mesage,
        })
      );
  });
};

// ------------------SEND RESET PASSWORD ------------------
exports.sendResetPassword = async (req, res, next) => {
  const { email } = req.body;
  // Check if email is provided
  if (!email) {
    return res.status(400).json({
      message: "Email not present",
    });
  }
  await User.findOne({ email })
    .then((user) => {
      const maxAge = 3 * 60 * 60;
      const token = jwt.sign({ id: user._id }, jwtSecret, {
        expiresIn: maxAge, // 3hrs in sec
      });
      // SEND EMAIL VERIFICATION ON REGISTRATION
      const url = `${process.env.BASE_URL}/reset_password/${user._id}/${token}`;
      resetPassword(email, "Password reset", url);

      res.status(201).json({
        message: "A password reset sent to your account",
        user: user._id,
      });
    })
    .catch((error) =>
      res.status(401).json({
        message: "Reset email not sent successful created",
        error: error.mesage,
      })
    );
};

// ------------------ Update Password ----------------
exports.updatePassword = async (req, res, next) => {
  const { password, id } = req.body;
  bcrypt.hash(password, 10).then(async (hash) => {
    await User.updateMany(
      { id: id },
      { $set: { password: hash, confirmPassword: hash } }
    );
    res.status("201").json({ message: "Update successful" });
  });
};

// ------------------ Update Role ------------------
exports.updateRole = async (req, res, next) => {
  const { role, id } = req.body;
  // Verifying if role and id is presnt
  if (role && id) {
    // Verifying if the value of role is admin
    if (role === "admin") {
      await User.findById(id)
        .then((user) => {
          // Third - Verifies the user is not an admin
          if (user.role !== "admin") {
            user.role = role;
            user.save((err) => {
              //Monogodb error checker
              if (err) {
                res
                  .status("400")
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
              }
              res.status("201").json({ message: "Update successful", user });
            });
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    } else {
      res.status(400).json({
        message: "Role is not admin",
      });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
};

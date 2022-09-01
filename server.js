const connectDB = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const { adminAuth, userAuth } = require("./middleware/auth.js");
const User = require("./model/User");

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

// Middleware

app.use("/api/auth", require("./Auth/route"));

const PORT = 5000;

//Connecting the Database
connectDB();

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

// LOGOUT
app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.status(201).json({
    message: "User successfully Logged out",
  });
});

// VERIFY EMAIL LINK

app.get("/verify/:id/:token", async (req, res) => {
  const { token, id } = req.params;

  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(400).send({ message: "invalid Link" });
    }

    if (user.verified === false) {
      console.log(user);
      await user.updateOne({ _id: user.id, verified: true });
    }

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Email verification failed", error: error });
  }
});

app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`));

// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

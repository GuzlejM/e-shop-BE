const connectDB = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const { OAuth2Client } = require("google-auth-library");

const { adminAuth, userAuth } = require("./Auth/Auth");

const app = express();

app.use(cookieParser());
app.use(cors());
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
  res.redirect("/");
});

app.post("api/google-auth");

app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`));

// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

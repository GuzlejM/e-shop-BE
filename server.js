const connectDB = require("./db");
const express = require("express");
const cookieParser = require("cookie-parser");

const { adminAuth, userAuth } = require("./Auth/Auth");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Middleware

app.use("/api/auth", require("./Auth/route"));

const PORT = 5000;

//Connecting the Database
connectDB();

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`));

// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

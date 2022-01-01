const express = require("express");
const app = express();
const connectDB = require("./config/db");
const colors = require("colors");

// Connect Database
connectDB();

// Require Routers
const user = require("./routes/api/users");
const post = require("./routes/api/posts");
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");

// Express Middleware
app.use(express.json({ extended: false }));

app.get("/", function (req, res) {
  res.send("API Running");
});

// Mounting Routers
app.use("/api/users", user);
app.use("/api/posts", post);
app.use("/api/auth", auth);
app.use("/api/profile", profile);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server Started at PORT ${PORT}`.blue);
});

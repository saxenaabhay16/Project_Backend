const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/DbConfig");
const AuthRoutes = require("./routes/AuthRoutes");
const UserRoutes = require("./routes/UserRoutes");
const PostRoutes = require("./routes/PostRoutes");
const CommentRoutes = require("./routes/CommentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/auth", AuthRoutes);
app.use("/users", UserRoutes);
app.use("/posts", PostRoutes);
app.use("/comments", CommentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

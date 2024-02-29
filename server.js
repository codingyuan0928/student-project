const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8080;
//connect to mongoDB
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connect to mongoDB Atlas");
  })
  .catch((e) => {
    console.log(e);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "frontend", "build")));
app.use("/api/user", authRoute);
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);
//如果是local strategy的話， passport.authenticate('local', { failureRedirect: '/login' })
//記得Header中的JWT跟後方的文字需要有空白才能成功登入
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`Server running on port ${port} .`);
});

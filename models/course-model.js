const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  price: { type: Number, required: true },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //意思是指這個User會跟collection做連結
  },
  students: {
    type: [String], //可能不只一位學生註冊
    default: [],
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;

const mongoose = require("mongoose");
const toDoItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Todo = mongoose.model("todo", toDoItemSchema);

module.exports = Todo;

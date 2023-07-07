const mongoose = require("mongoose");
const Todo = require("../models/todoitem");
mongoose
  .connect("mongodb://localhost:27017/todoApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

const todoList = [
  {
    item: "First Todo",
    completed: true,
  },
  {
    item: "Second Todo",
    completed: false,
  },
];

Todo.insertMany(todoList)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

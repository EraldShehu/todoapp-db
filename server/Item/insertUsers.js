const mongoose = require("mongoose");
const User = require("../models/user");
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

const insertUser = [
  {
    firstName: "Erald",
    lastName: "Shehu",
    email: "eraldshehu@gmail.com",
    password: "1234",
  },
  {
    firstName: "Ai",
    lastName: "Robbot",
    email: "airobbot@gmail.com",
    password: "1234",
  },
];

User.insertMany(insertUser)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

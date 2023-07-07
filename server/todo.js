const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Todo = require("./models/todoitem");
const cors = require("cors");
const User = require("./models/user");
// const { localStorage } = require("node-localstorage");
// localStorage.setItem("user", data);
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

// const DataTodo = require("./toDoItemSchema"); // Replace with the actual path to your schema file

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

app.get("/users", cors(), async (req, res) => {
  try {
    const data = await User.find({}).exec();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (user) {
      res.send(user);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/users", cors(), async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const data = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    console.log(data);
    res.send({ result: true, message: "To do added successfylly" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/notes", cors(), async (req, res) => {
  try {
    const data = await Todo.find({}).populate("user").exec();
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/notes", cors(), async (req, res) => {
  const item = req.body.item;
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const data = await Todo.create({
      item: item,
      completed: false,
      user: user._id, // Associate the user with the todo
    });

    console.log(data);
    res.send({ result: true, message: "Todo added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findById(id);

    if (todo) {
      res.send(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findById(id);

    if (todo) {
      if (req.body.item) {
        todo.item = req.body.item;
      }
      if (req.body.completed) {
        todo.completed = req.body.completed;
      }

      todo.save();

      res.send({ result: true, message: "To do edited successfully" });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Check if the Todo item exists
    const todo = await Todo.findById(id);

    if (todo) {
      // Todo item found, proceed with deletion
      const result = await Todo.findByIdAndDelete(id);
      res.send({ result: true, message: "Todo deleted successfully" });
    } else {
      // Todo item not found
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});

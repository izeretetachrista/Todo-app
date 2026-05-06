import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import TodoModel from "./Models/Todo.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://aip:1234@cluster0.ngn31eh.mongodb.net/Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* GET ALL TASKS */
app.get("/get", async (req, res) => {
  try {
    const todos = await TodoModel.find();

    res.json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ADD TASK */
app.post("/add", async (req, res) => {
  try {
    const todo = await TodoModel.create({
      task: req.body.task,
      done: false,
    });

    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* UPDATE TASK TEXT */
app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      {
        task: req.body.task,
      },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* COMPLETE TASK */
app.put("/complete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await TodoModel.findById(id);

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      {
        done: !todo.done,
      },
      { new: true }
    );

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE TASK */
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    res.json(deletedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3001, () => {
  console.log("Server Running on Port 3001");
});
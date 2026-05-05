import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },

    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel = mongoose.model("todos", TodoSchema);

export default TodoModel;
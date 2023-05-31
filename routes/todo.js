const express = require("express");
const router = express.Router();
const TodoModel = require("../models/Todo");
// const auth = require("../middleware/auth");
// const mongoose = require("mongoose");

// @route   GET api/todo
// @desc    get all todo by user email
// @access  private
// @query   userEmail,club,skip,limit
router.get("/", async (req, res) => {
  try {
    let { userEmail, skip, limit } = req.query;
    skip = Number(skip);
    limit = Number(limit);
    function matchQuery() {
      if (userEmail) {
        return {
          userEmail: userEmail,
        };
      } else {
        return {userEmail:null};
      }
    }
    const todo = await TodoModel.aggregate()
      .match(matchQuery())
      .skip(skip ? skip : 0)
      .limit(limit ? limit : 9999);

    res.status(200).send(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, masssage: "no todos" });
  }
});


// @route   POST api/todo
// @desc    create/add one new todo
// @access  Private
router.post("/", async (req, res) => {
  let todo = new TodoModel({
    title: req.body.title,
    description: req.body.description,
    userEmail: req.body.userEmail,
    displayName: req.body.displayName,
  });
  console.log(todo);
  try {
    todo = await todo.save();
    res.send({ success: true, message: "todo created" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, message: "todo cannot be created" });
  }
});


// @route   PUT api/todo
// @desc    update completed
// @access  public
router.put("/", async (req, res) => {
  let { todoId } = req.query;
  try {
    const todo = await TodoModel.findById(todoId);
    todo.completed = req.body.completed;
    await todo.save();
    res.status(200).send(todo);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, message: "todo can't be updated" });
  }
});

// @route   DELETE api/todo/one
// @desc    delete one todo
// @access  Private
router.delete("/one", async (req, res) => {
  try {
    let todoId = req.body.todoId;
    const todo = await TodoModel.findByIdAndDelete({ _id: todoId });
    if (!todo) throw error;
    res.status(200).send({ success: true, message: "todo deleted" });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "todo cannot be deleted" });
  }
});

module.exports = router;

const express = require("express");
const todoRouter = express.Router();
const { Todo } = require("../../db/models");

// Получение всех задач с возможностью фильтрации по статусу
todoRouter.get("/", async (req, res) => {
  try {
    const { done } = req.query;

    let filter = {};
    if (done !== undefined) {
      // Проверяем, является ли параметр done булевым значением
      if (done === "true" || done === "false") {
        filter.done = done === "true";
      } else {
        return res.status(400).send("Invalid value for 'done' query parameter");
      }
    }

    const todos = await Todo.findAll({ where: filter });
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("Internal server error");
  }
});

// Создание новой задачи
todoRouter.post("/", async (req, res) => {
  try {
    const { title, description, done } = req.body;

    if (!title) {
      return res.status(400).send("Title is required");
    }

    const todo = await Todo.create({
      title,
      description,
      done: done !== undefined ? done : false,
    });
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).send("Internal server error");
  }
});

// Получение задачи по ID
todoRouter.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    res.json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    res.status(500).send("Internal server error");
  }
});

// Удаление задачи по ID
todoRouter.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    await todo.destroy();
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("Internal server error");
  }
});

// Обновление задачи по ID
todoRouter.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    const { title, description, done } = req.body;

    await todo.update({
      title: title !== undefined ? title : todo.title,
      description: description !== undefined ? description : todo.description,
      done: done !== undefined ? done : todo.done,
    });

    res.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = todoRouter;

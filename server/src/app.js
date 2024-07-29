const express = require("express");
const morgan = require("morgan");

const todoRouter = require("./routes/taskRouter");

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/tasks", todoRouter);

module.exports = app;

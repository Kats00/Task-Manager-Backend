const Task = require("../models/TaskDBModel");

exports.findAll = (req, res, next) => {
  Task.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the tasks.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "body content is empty",
    });
  }

  const newTask = new Task({
    title: req.body.title,
    status: req.body.status,
  });

  Task.create(newTask, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the task.",
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  Task.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Task with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Task with id " + req.params.id,
        });
      }
    } else res.send({ message: `Task was deleted successfully!` });
  });
};

exports.update = (req, res) => {
  if (!req.body || !req.body.title || !req.body.status) {
    return res.status(400).send({
      message: "Title and status are required fields.",
    });
  }

  const updatedTask = new Task({
    title: req.body.title,
    status: req.body.status,
  });

  Task.updateById(req.params.id, updatedTask, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Task with id ${req.params.id} not found.`,
        });
      } else {
        return res.status(500).send({
          message: "Error updating task with id " + req.params.id,
        });
      }
    } else {
      return res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  Task.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving task with id " + req.params.id,
        });
      }
    } else {
      res.send(data);
    }
  });
};

module.exports = (app) => {
  const tasks = require("../controllers/taskController");
  const express = require("express");
  const router = express.Router();

  router.get("/", tasks.findAll);
  router.post("/add-task", tasks.create);
  router.delete("/delete-task/:id", tasks.delete);
  router.put("/edit-task/:id", tasks.update);
  router.get("/find-task/:id", tasks.findOne);

  app.use("/api/tasks", router);
};

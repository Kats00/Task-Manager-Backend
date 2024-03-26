const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const taskController = require("./controllers/taskController");

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(express.json());
app.use(morgan("combined"));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the task application back end." });
});

require("./routes/taskRoutes")(app);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT,
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});

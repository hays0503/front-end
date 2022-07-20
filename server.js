const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const favicon = require("express-favicon");
const employer_model = require("./database");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.use(favicon(__dirname + "/build/favicon.ico"));
//здесь наше приложение отдаёт статику
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

//обслуживание html
app.get("/index", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/database", (req, res) => {
  employer_model
    .getEmployer()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/add", (req, res) => {
  employer_model
    .addEmployer(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

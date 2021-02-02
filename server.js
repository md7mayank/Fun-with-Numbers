const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  var no = Number(req.body.num);
  url = `http://numbersapi.com/${no}`
  http.get(url, function (response) {
    response.on("data", function (data) {
      let json = JSON.stringify(data);
      let bufferOriginal = Buffer.from(JSON.parse(json).data);
      let showdata = bufferOriginal.toString('utf8')
      res.write(`<p>your fact is :-</p>`)
      res.write(`<h2>${showdata}</h2>`);
      res.send();
    });
  });
});
app.listen(3000, function () {
  console.log("running at 3000");
});

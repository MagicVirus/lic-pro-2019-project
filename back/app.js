var express = require('express');
var db = require('./db/db');
var bodyParser = require('body-parser');
var fs = require('fs');

// Set up the express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all todos
app.get('/episodes', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'series retrieved successfully',
        todos: db
    })
});
app.post('/create', (req, res) => {
  if(!req.body.name) {
    return res.status(400).send({
      body: req.body,
      success: 'false',
      message: 'name is required'
    });
  } else if(!req.body.code) {
    return res.status(400).send({
      success: 'false',
      message: 'code is required'
    });
  }
  const serie = {
    id: db.data.length + 1,
    name: req.body.name,
    code: req.body.code,
    note: 0,
  }
  db.data.push(serie);
  fs.writeFile('myjsonfile.json', JSON.stringify(db), 'utf8', null);

  return res.status(201).send({
    success: 'true',
    message: 'serie added successfully',
    serie
  })
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
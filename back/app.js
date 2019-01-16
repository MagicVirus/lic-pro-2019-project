var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var fileManager = require('./fileManager');

// Set up the express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all todos
app.get('/episodes', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'series retrieved successfully',
        todos: '1',
    })
});
app.post('/show', (req, res) => {
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
  const episode = {
    id: 1,
    name: req.body.name,
    code: req.body.code,
    note: 0,
  }
  fileManager.addEpisode(episode);

  return res.status(201).send({
    success: 'true',
    message: 'serie added successfully',
    episode
  })
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
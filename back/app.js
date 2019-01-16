const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fileManager = require('./fileManager');
const uuidv1 = require('uuid/v1');
const app = express();

var data = {};
var degueulasse = fileManager.getEpisodes('episodes/', function(filename, content) {
    data[filename] = content;
    console.log('filenae :'+ data[filename])
}, function(err) {
    throw err;
});
console.log(degueulasse)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/episodes', (req, res) => {

    res.status(200).send({
        success: 'true',
        message: 'series retrieved successfully',
        episodes: data,
    })
});

app.post('/show', (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            body: req.body,
            success: 'false',
            message: 'name is required'
        });
    } else if (!req.body.code) {
        return res.status(400).send({
            success: 'false',
            message: 'code is required'
        });
    }

    const episode = {
        id: uuidv1(),
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
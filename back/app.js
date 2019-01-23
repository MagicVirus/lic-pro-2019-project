const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fileManager = require('./fileManager');
const uuidv1 = require('uuid/v1');
const app = express();

var data = {};
var degueulasse = fileManager.getEpisodes('episodes/', function(filename, content) {
    data[filename] = JSON.parse(content);
    console.log('filename :'+ data[filename])
}, function(err) {
    throw err;
});
console.log(degueulasse)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/episodes', (req, res) => {

    res.status(200).send({
        success: 'true',
        message: 'episodes retrieved successfully',
        episodes: data,
    })
});

app.delete('/delete', (req, res) => {

    if (!req.body.uuid) {
        return res.status(400).send({
            body: req.body,
            success: 'false',
            message: 'uuid is required'
        });
    }

    fileManager.removeEpisode(req.body.uuid);

    res.status(200).send({
        success: 'true',
        message: 'episode deleted successfully',
        episode: req.body.uuid,
    })
});

app.post('/add', (req, res) => {
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

app.put('/update', (req, res) => {

    if (!req.body.uuid) {
        return res.status(400).send({
            body: req.body,
            success: 'false',
            message: 'uuid is required'
        });
    }

    fileManager.editEpisode(req.body.uuid,req.body.name,req.body.code,req.body.note);

    res.status(200).send({
        success: 'true',
        message: 'episode modified successfully',
        episode: req.body.uuid,
    })
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
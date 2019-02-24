const express = require('express');
const bodyParser = require('body-parser');
const fileManager = require('./fileManager');
const app = express();
var fs = require('fs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/api/episodes', (req, res) => {
    var promise = fileManager.getEpisodes('episodes/',res);
    promise.then((episodes) => {
        res.send({
            message: 'episodes retrieved successfully',
            episodes: episodes,
        });
    }).catch(() => {
        res.status(500).send({
            message: 'error retriving episodes',
        });
    });
});

app.delete('/api/episodes/:uuid', (req, res) => {

    if (!req.params.uuid) {
        return res.status(400).send({
            body: req.body,
            success: 'false',
            message: 'uuid is required'
        });
    }

    console.log(req.params.uuid);

    var promise = fileManager.removeEpisode(req.params.uuid);

    promise.then((success)=>{
        res.status(200).send({
            success: 'true',
            message: success,
            episode: req.params.uuid,
        });
    }).catch((failed)=>{
        res.status(500).send({
            success: 'false',
            message: 'Episode not found :' + failed,
        });
    });
});

app.post('/api/episodes', (req, res) => {

    if (!req.body.name || !req.body.code || !req.body.note) {
        return res.status(400).send({
            body: req.body,
            success: 'false',
            message: 'Missing parameters \n' + 'name =' + req.body.name + '\ncode =' + req.body.code + '\nnote =' + req.body.note
        });
    }

    var promise = fileManager.addEpisode(req.body.name, req.body.code, req.body.note);

    promise.then((success)=>{
        res.status(200).send({
            success: 'true',
            message: success,
            episode: req.params.uuid,
        });
    }).catch((failed)=>{
        res.status(500).send({
            success: 'false',
            message: 'Episode not created :' + failed,
        });
    });

});

app.put('/api/episodes/:uuid', (req, res) => {

    if (!req.params.uuid) {
        return res.status(404).send({
            body: req.body,
            success: 'false',
            message: 'Uuid is required as parameter'
        });
    }

    if (!req.body.name || !req.body.code || !req.body.note) {
        return res.status(404).send({
            body: req.body,
            success: 'false',
            message: 'Missing parameters \n' + 'name =' + req.body.name + '\ncode =' + req.body.code + '\nnote =' + req.body.note
        });
    }


    var promise = fileManager.editEpisode(req.params.uuid, req.body.name, req.body.code, req.body.note);

    promise.then((success)=>{
        res.status(200).send({
            success: 'true',
            message: success,
            episode: req.params.uuid,
        });
    }).catch((failed)=>{
        res.status(500).send({
            success: 'false',
            message: 'Episode not modified :' + failed,
        });
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
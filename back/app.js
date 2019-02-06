const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const fileManager = require('./fileManager');
const uuidv1 = require('uuid/v1');
const app = express();

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
    })


});

app.delete('/api/delete/:uuid', (req, res) => {

    if (!req.params.uuid) {
        return res.status(400).send({
            body: req.body,
            success: 'false',
            message: 'uuid is required'
        });
    }

    if ( fileManager.removeEpisode(req.params.uuid))
    {
        res.status(200).send({
            success: 'true',
            message: 'episode deleted successfully',
            episode: req.params.uuid,
        })
    }
    else {
        res.status(500).send({
            success: 'false',
            message: 'File not found',
        })
    }
});

app.post('/api/add', (req, res) => {

    if (!req.body.name || !req.body.code || !req.body.note) {
        return res.status(400).send({
            body: req.body,
            success: 'false',
            message: 'Missing parameters :'+'name ='+req.body.name+'; code ='+req.body.code + '; note ='+req.body.note
        });
    }

    const episode = {
        id: uuidv1(),
        name: req.body.name,
        code: req.body.code,
        note: req.body.note,
    };

    if( fileManager.addEpisode(episode)) {
        return res.status(201).send({
            success: 'true',
            message: 'serie added successfully',
            episode
        })
    }
    else {
        res.status(500).send({
            success: 'false',
            message: 'Error occured when adding episode',
        });
    }
});

app.put('/api/update/:uuid', (req, res) => {

    if (!req.params.uuid) {
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
        episode: req.params.uuid,
    })
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
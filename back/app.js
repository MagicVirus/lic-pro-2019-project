var express = require('express');
var db = require('./db/db');

// Set up the express app
const app = express();

// get all todos
app.get('/api/v1/list', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'series retrieved successfully',
        todos: db
    })
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
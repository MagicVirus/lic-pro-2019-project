const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')
const fs = require('fs');

describe('Unit testing the GET /api/episodes route', function() {

    it('should return OK status', function() {
        return request(app)
            .get('/api/episodes')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });
});
describe('Unit testing the GET /api/episodes', function() {
    it('should return message on rendering', function() {
        return request(app)
            .get('/api/episodes')
            .then(function(response){
                expect(response.text).to.contain('episodes retrieved successfully');
            })
    });
});
describe('Unit testing the POST /api/episodes', function() {
    it('should return OK status', function() {
        return request(app)
            .post('/api/episodes')
            .send('name=test')
            .send('code=test')
            .send('note=01')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });
});
describe('Unit testing the POST /api/episodes', function() {
    it('should return message on rendering', function() {
        return request(app)
            .post('/api/episodes')
            .send('name=test')
            .send('code=test')
            .send('note=01')
            .then(function(response){
                expect(response.text).to.contain('true');
            })
    });
});
// describe('Unit testing the DELETE /api/episodes/:uuid', function() {
//
//     fs.writeFileSync(__dirname + '/../episodes/aaaaaaa-392a-11e9-b29b-33e4e41f52ac.json','test');
//     it('should return OK status', function() {
//         return request(app)
//             .delete('/api/episodes/aaaaaaa-392a-11e9-b29b-33e4e41f52ac')
//             .then(function(response){
//                 assert.equal(response.status, 200)
//             })
//     });
//
// });

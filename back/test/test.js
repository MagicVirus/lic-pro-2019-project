const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')

describe('Unit testing the /api/episodes route', function() {

    it('should return OK status', function() {
        return request(app)
            .get('/api/episodes')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });

});
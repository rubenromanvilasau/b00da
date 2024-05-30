const app = require('../app');
const request = require('supertest');

const marketId = 'btc-clp';

describe('GET /api/markets/spreads, get all markets spreads', () => {
    it('should return 200 OK',(done) => {
        request(app)
            .get('/api/markets/spreads')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
    
});

describe('GET /api/markets/btc-clp/spread, get btc-clp market spread', () => {
    it('should return 200 OK',(done) => {
        request(app)
            .get(`/api/markets/${marketId}/spread`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

describe('GET /api/markets/spread/changes, get btc-clp market spread changes', () => {
    it('should return 200 OK',(done) => {
        request(app)
            .get('/api/markets/spread/changes')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

describe('GET /api/markets/spreads, get all markets spreads', () => {
    it('should return an array',(done) => {
        request(app)
            .get('/api/markets/spreads')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toBeInstanceOf(Array);
                done();
            });
    });
});

describe('GET /api/markets/btc-clp/spread, get btc-clp market spread', () => {
    it('should return an object',(done) => {
        request(app)
            .get(`/api/markets/${marketId}/spread`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toBeInstanceOf(Object);
                done();
            });
    });
});

describe('GET /api/markets/spread/changes, get btc-clp market spread changes', () => {
    it('should return an object',(done) => {
        request(app)
            .get('/api/markets/spread/changes')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toBeInstanceOf(Object);
                done();
            });
    });
});

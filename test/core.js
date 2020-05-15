process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
const { coreSchema, Core } = require('../model/core');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);
console.log(server);
console.log(server.address());

describe('/GET core', () => {
    it('it should GET all core info', (done) => {
        chai.request(server)
        .get('/api/core')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
    });
});

async function find_poll_by_url(url) {
    const result = await Poll.find();
    for(let i = 0; i < result.length; i++){
        if (result[i].core.url === url){
            return result[i];
        }
    }
    return false;
}

describe('/GET core', () => {
    it('it should GET one new core info', (done) => {
        chai.request(server)
        .get('/api/core/new')
        .end((err, res) => {
            res.should.have.status(200);
            const pool = find_poll_by_url(res.body.url);
            assert(pool != false);
            done();
        })
    });
});

describe('/GET poll', () => {
    it('it should GET all poll info', (done) => {
        chai.request(server)
        .get('/api/poll')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
    });
});

describe('/GET rating', () => {
    it('it should GET all poll info', (done) => {
        chai.request(server)
        .get('/api/rating')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
    });
});

describe('/GET result', () => {
    it('it should GET all poll info', (done) => {
        chai.request(server)
        .get('api/results/cute-little-beaver')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
    });
});




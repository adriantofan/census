process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/app');
const knex = require('../src/db/connection');

describe('CENSUS API Routes', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /census/ping', () => {
    it('should return "pong"', () => {
      chai.request(server)
      .get('/census/ping')
      .end((err, res) => {
        res.type.should.eql('text/html');
        res.text.should.eql('pong');
      });
    });
  });

  describe('GET /census/user', () => {
    it(('should not accept out of range params'), () => {
      chai.request(server)
      .get('/census/by/41')
      .end((err, res) => {
        res.type.should.equal('application/json');
        res.body.status.should.equal('error');
      });
    });
    
    it('should return correct values for salary range', () => {
      chai.request(server)
      .get('/census/by/40')
      .end((err, res) => {
        res.type.should.equal('application/json');
        res.body.status.should.equal('success');
        res.body.data.should.be.a('object');
        res.body.data.name.should.equal('salary range');
        res.body.data.items.should.be.a('array');
        res.body.data.items.length.should.equal(2);
        res.body.data.items[0].value.should.equal('20');
        res.body.data.items[0].count.should.equal('2');
        res.body.data.items[0].avg.should.equal('30.0000000000000000');
      });
    });
  });

});

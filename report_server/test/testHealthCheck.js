const request = require('supertest');
const chai = require('chai');
chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();

process.env.NODE_ENV = 'test';  // Set environment to test

describe('Testing health-check', function () {
	let server;
	beforeEach(function () {
		server = require('../bin/www' );
	});
	afterEach(function (done) {
		delete require.cache[require.resolve('../bin/www')];
		done();
	});
	describe('GET /untapped/health-check', function() {
		it('should get /untapped/health-check', function testHealthCheck(done) {
			chai.request(server)
				.get('/untapped/health-check')
				.end(function(err, res) {
					// console.log(JSON.stringify(res))
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('server').eql('Ok');
					res.body.should.have.property('database').eql('Ok');
					done(err);
				});
		});
	});
	describe('404 everything else', function() {
		it('404 everything else', function testPath(done) {
			request(server)
				.get('/untapped/rubbish')
				.end(function (err ) {
					done(err);
				});
		});
	});
});


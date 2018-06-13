const request = require('supertest');
const expect = require('chai').expect;
const chai = require('chai');
chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const sprintf = require('sprintf-js').sprintf;

describe('Testing Sales ByChannel API', function () {
	let server;
	beforeEach(function () {
		server = require('../bin/www' );
	});
	afterEach(function (done) {
		delete require.cache[require.resolve('../bin/www')];
		done();
	});

	describe('GET /sema/site/customers - missing site-id', function() {
		it('Should fail with 400 error code', (done) => {
			chai.request(server)
				.get('/sema/site/customers')
				.end(function(err, res) {
					res.should.have.status(400);
					done(err);
				});
		});
	});
	describe('GET /sema/site/customer - unknown site-id', function() {
		it('Should succeed with customer info becuase the site-id does not exist', (done) => {
			chai.request(server)
				.get('/sema/site/customers?site-id=9999')
				.end(function(err, res) {
					res.should.have.status(200);
					expect(res.body.customers).to.be.an('array');
					expect(res.body.customers).to.be.empty;

					done(err);
				});
		});
	});
	describe('GET /sema/site/customers - UnitTestCustomer site-id', function() {
		it('Should get info for one customer with one sale', (done) => {
			chai.request(server)
				.get('/untapped/kiosks')
				.end(function(err, res) {
					expect(res.body.kiosks).to.be.an('array');
					let url = "/sema/site/customers?site-id=%d";
					let site_index = -1;	// Not a real index
					for (let i=0; i<res.body.kiosks.length; i++) {
						if (res.body.kiosks[i].name === 'UnitTestCustomers') {
							site_index = i;
							break;
						}
					}

					res.body.kiosks[site_index].should.have.property('name').eql('UnitTestCustomers');

					url = sprintf(url, res.body.kiosks[site_index].id)

					chai.request(server)
						.get(url)
						.end(function(err, res) {
							res.should.have.status(200);
							expect(res.body.customers).to.be.an('array');
							expect(res.body.customers.length).to.be.equal(6);

							done(err);
						});
				});
		});
	});
});

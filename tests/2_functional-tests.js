/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
	suite('Routing Tests', function() {
		suite('GET /api/convert => conversion object', function() {
			test('Convert 10L (valid input)', function(done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '10L' })
					.end(function(err, res) {
						assert.equal(res.status, 200);
						assert.equal(res.body.initNum, 10);
						assert.equal(res.body.initUnit, 'l');
						assert.approximately(res.body.returnNum, 2.64172, 0.1);
						assert.equal(res.body.returnUnit, 'gal');
						done();
					});
			});

			test('Convert 32g (invalid input unit)', function(done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '32g' })
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.equal(res.body.error, 'invalid unit input');
					});
				done();
			});

			test('Convert 37..3kg (invalid number)', function(done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '37..3kg' })
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.equal(res.body.error, 'invalid number input');
						done();
					});
			});

			test('Convert 39..9kilomegagram (invalid number and unit)', function(done) {
				chai.request(server)
					.get('/api/convert')
					.query({ input: '39..99kilomegagram' })
					.end((err, res) => {
						assert.equal(res.status, 200);
						assert.equal(res.body.error, 'invalid number and unit input');
						done();
					});
			});

			test('Convert kg (no number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({ input: 'kg' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.returnNum, 2.20462);
          assert.equal(res.body.returnUnit, 'lbs');
          done();
        })
			});
		});
	});
});

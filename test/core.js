// npm packages
const request = require('supertest');

// our packages
const application = require('../server/index');

module.exports =
  function(test) {
    test('GET /v1/datahub/ping', (t) => {
      request(application)
      .get('/v1/datahub/ping')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.equal(actualBody.code, 'OK', 'Code OK');
        t.end();
      });
    });

    test('404 on nonexistant URL', (t) => {
      request(application)
      .get('/GETShouldFailOnRandomURL')
      .expect(404)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = 'E_NOT_FOUND';
        const actualBody = res.body;

        t.error(err, 'No error');
        t.equal(actualBody.code, expectedBody, 'Retrieve body');
        t.end();
      });
    });

    test('GET /v1/datahub/get_all_taxes', (t) => {
      request(application)
      .get('/v1/datahub/get_all_taxes')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.equal(actualBody.code, 'OK', 'Code OK');
        t.ok(Object.keys(actualBody.data).length > 50, 'Taxes Object > 50 items');
        t.end();
      });
    });

    test('GET /v1/datahub/tax/UA', (t) => {
      request(application)
      .get('/v1/datahub/tax/UA')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.equal(actualBody.code, 'OK', 'Code OK');
        t.equal(actualBody.data.withholding_tax_rate, 0.1, '10% Tax Rate for Ukraine');
        t.end();
      });
    });

    test('GET /v1/datahub/countries', (t) => {
      request(application)
      .get('/v1/datahub/countries')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;
        t.error(err, 'No error');
        t.equal(actualBody.code, 'OK', 'Code OK');
        t.ok(Object.keys(actualBody.data).length > 240, 'Countries List > 240 countries');
        t.end();
      });
    });

    test('GET /v1/datahub/countries/filter?name=Poland', (t) => {
      request(application)
      .get('/v1/datahub/countries/filter?name=Poland')
      // .send({name: 'Poland'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.equal(actualBody.code, 'OK', 'Code OK');
        t.equal(actualBody.data.isoAlpha3, 'POL', 'Poland ISO Alpha 3 = POL');
        t.equal(actualBody.data.fipsCode, 'PL', 'Poland FIPS = PL');
        t.end();
      });
    });
  };

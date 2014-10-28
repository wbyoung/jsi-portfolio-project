'use strict';

process.env.NODE_ENV = 'development'; 

var _ = require('lodash');
var app = require('../../server/application');
var expect = require('chai').expect;
var bluebird = require('bluebird');
var request = bluebird.promisifyAll(require('request'));
var util = require('util');
var knex = app.get('knex');
var server;
var port = 56789;
var baseURL = util.format('http://localhost:%d', port);
var Statement = app.get('Statement');

describe('api', function() {

  before(function(done) {
    server = app.listen(port,done);
  });

  after(function(done) {
    server.close(done);
  });

  beforeEach(function(done) {
    knex('statements').delete().then(function() {
      return knex.raw('alter sequence confessions_id_seq restart');
    }).then(function() { done(); }, done);
  });

  it.skip('handles POST /api/statements', function(done) {
    var statement = {
      body: 'I was scared of Santa when I was younger. ' +
        'He looked too much like my mom.'
    };
    request.postAsync(baseURL + '/api/statements', { form: statement })
    .spread(function(response, body) {
      expect(JSON.parse(body)).to.eql({
        statement: _.extend({ id: 1 }, statement)
      });
      return Statement.fetchAll();
    })
    .then(function(statements) {
      expect(statements.toJSON()).to.eql(_.extend({ id: 1 }, statement));
    })
    .done(done, done);
    // actually send that to the API.
    // check that a statement ends up in the DB.
  });
});

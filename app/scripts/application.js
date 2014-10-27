'use strict';

var JsiPortfolioProject = Ember.Application.create();

JsiPortfolioProject.Router.reopen({
  location: 'history'
});

JsiPortfolioProject.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1'
});

// expose JsiPortfolioProject globally
window.JsiPortfolioProject = JsiPortfolioProject;

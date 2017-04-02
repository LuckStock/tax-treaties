/**
 * Created by beka on 5/5/16.
 */

const hubController = require('./dataHubController.v1');

module.exports = {
  '/v1/datahub': {
    '/ping': {
      all: hubController.ping,
    },

    '/countries': {
      get: hubController.countries,
    },
    '/countries/filter': {
      get: hubController.countriesFilter,
    },

    '/canada_states': {
      get: hubController.canadaStates,
    },
    '/states': {
      get: hubController.states,
    },
    '/states/filter': {
      get: hubController.statesFilter,
    },

    '/tax/:code': {
      get: hubController.getTax,
    },

    '/get_all_taxes': {
      get: hubController.getAllTaxes,
    },

    '/taxclassification': {
      get: hubController.taxClassification,
    },

    '/chapter3status': {
      get: hubController.chapter3status,
    },

  },

};

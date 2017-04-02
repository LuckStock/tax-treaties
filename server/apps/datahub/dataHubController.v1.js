/**
 * Created by beka on 4/5/16.
 */

/* eslint-disable no-unused-vars*/
const debug = require('debug')('app');
/* eslint-enable no-unused-vars*/

const _ = require('underscore');

const utils = require('../../helpers/util');

const countriesObject = require('./files/countries.json');
const caStates = require('./files/canadastates.json');
const usStates = require('./files/states.json');
const taxObject = require('./files/tax.json');
const taxClassObject = require('./files/taxclassification.json');
const chapter3Object = require('./files/chapter3status.json');


const capitalizeFirstLetter = function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

function pingHub(req, res) {
  res.ok(null, null, 'API server for datahub is working');
}


function countries(req, res) {
  res.ok(_.sortBy(countriesObject.countries, 'countryName'));
}

function canadaStates(req, res) {
  res.ok(_.sortBy(caStates.states, 'stateName'));
}

function states(req, res) {
  res.ok(_.sortBy(usStates.states, 'stateName'));
}

function getTax(req, res) {
  const result = taxObject[req.params.code.toUpperCase()];

  if (_.isEmpty(result)) {
    res.notFound(result);
  } else { res.ok(result); }
}

function getAllTaxes(req, res) {
  res.ok(taxObject);
}

function taxClassification(req, res) {
  res.ok(_.sortBy(taxClassObject.taxclassification, 'code'));
}

function chapter3status(req, res) {
  res.ok(_.sortBy(chapter3Object.chapter3status, 'code'));
}

function countriesFilter(req, res) {
  let result = [];


  if ('name' in req.query) {
    result = utils.obj_extractor(countriesObject.countries, 'countryName', capitalizeFirstLetter(req.query.name));
  }

  if ('code' in req.query) {
    result = utils.obj_extractor(countriesObject.countries, 'countryCode', req.query.code.toUpperCase());
  }

  if ('isoAlpha3' in req.query) {
    result = utils.obj_extractor(countriesObject.countries, 'isoAlpha3', req.query.isoAlpha3.toUpperCase());
  }

  if (result.length > 0) { res.ok(result[0]); } else { res.notFound(result[0]); }
}

function statesFilter(req, res) {
  let result = [];
  if ('name' in req.query) {
    result = utils.obj_extractor(usStates.states, 'stateName', capitalizeFirstLetter(req.query.name));
  }

  if ('code' in req.query) { result = utils.obj_extractor(usStates.states, 'stateCode', req.query.code.toUpperCase()); }

  if (result.length > 0) { res.ok(result[0]); } else { res.notFound(result[0]); }
}

module.exports = {
  ping: pingHub,
  countries,
  states,
  canadaStates,
  getTax,
  getAllTaxes,
  countriesFilter,
  statesFilter,
  taxClassification,
  chapter3status,
};

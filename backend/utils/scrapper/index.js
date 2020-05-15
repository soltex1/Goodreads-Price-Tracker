// Imports
const Requester = require( "./requester" );
const Parser = require( "./parser" );
const Converter = require( "./converter" );

const Scrapper = function() {
  this.request = (uri) => Requester(uri);
  this.parse = (json) => Parser(json);
  this.convert = Converter;
};

module.exports = Scrapper;

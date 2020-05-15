"use strict";

const Path = require("path");

const getManifestPath = () => {

  return typeof process.env.NODE_ENV === "string" ?
    Path.join(__dirname, "config", process.env.NODE_ENV + ".js")
    : "./config/development";
};

const GetManifest = require(getManifestPath());

module.exports = GetManifest;

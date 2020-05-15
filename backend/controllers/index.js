// Imports
const Book = require("./Book");
const User = require("./User");
const Shop = require("./Shop");

exports.plugin = {
  name: "controllers",
  version: "1.0.0",
  register: async (server, options) => {
    try {

      // Child controllers
      await server.register([
        Book,
        User,
        Shop
      ], options);

      server.log("controllers", "loaded");

    } catch (e) {
      server.log(["error", "controllers"], e.message);
      throw e;
    }
  }
};

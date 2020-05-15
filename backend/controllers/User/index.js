// Imports
const Books = require("./books");

exports.plugin = {
  name: "user-books",
  version: "1.0.0",
  register: async (server, options) => {

    // Child controllers
    await server.register([
      Books
    ], options);
  }
};

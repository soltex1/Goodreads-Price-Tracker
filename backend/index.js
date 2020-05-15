"use strict";

const Glue = require("@hapi/glue");
const Manifest = require("./manifest");

const options = {
  relativeTo: __dirname
};

const startServer = async function() {
  try {
    const server = await Glue.compose(Manifest, options);
    await server.start();
    console.log("Server running on %s", server.info.uri);

    // Socket io plugin
    const io = server.plugins["hapi-socket.io"].io;

    // Listen socket event
    io.on("connection", (socket) => {

      socket.on("getPrices", function(books) {
        server.inject({
          method: "POST",
          url: "/books/events",
          allowInternals: true,
          payload: {
            books
          }
        });
      });

    });

    // General route
    server.route({
      method: "GET",
      path: "/{param*}",
      handler: {
        directory: {
          path: ".",
          redirectToSlash: true
        }
      }
    });

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();

const Path = require("path");

const getConfig = () => ({
  server: {
    app: {
      environment: "production",
      hostname: process.env.HOSTNAME
    },
    port: process.env.PORT,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, "../public/client")
      },
      cors: true
    }
  },
  register: {
    plugins: [
      {
        plugin: require("inert")
      },
      {
        plugin: require("hapi-socket.io"),
        options: {
          auth: "jwt",
          socketoptions: {}
        }
      },
      {
        plugin: Path.join(__dirname, "../controllers"),
        options: {}
      }
    ]
  }
});

module.exports = getConfig();

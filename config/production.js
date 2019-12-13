const Path = require('path')

const getConfig = () => ({
  server: {
    app: {
      environment: 'development',
      hostname: process.env.HOSTNAME
    },
    debug: {
      log: ['error'],
      request: ['error']
    },
    port: process.env.PORT,
    routes: {
      cors: true
    }
  },
  register: {
    plugins: [
      {
        // Logging
        plugin: require('@hapi/good'),
        options: {
          ops: {
            interval: 60000
          },
          reporters: {
            myConsoleReporter: [
              {
                module: '@hapi/good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*', ops: '*' }]
              },
              {
                module: '@hapi/good-console'
              },
              'stdout'
            ]
          }
        }
      },
      {
        plugin: Path.join(__dirname, '../controllers'),
        options: {}
      },
      {
        plugin: require('hapi-socket.io'),
        options: {
          auth: 'jwt', //jwt Strategy
          socketoptions: {
          }
        }
      },
      {
        plugin: require('inert')
      }
    ]
  }
})

module.exports = getConfig()

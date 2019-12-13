'use strict'

const Glue = require('@hapi/glue')
const Manifest = require('./manifest')

const options = {
  relativeTo: __dirname
}

const startServer = async function () {
  try {
    const server = await Glue.compose(Manifest, options)
    await server.start()
    console.log('Server running on %s', server.info.uri)

    server.route({
      method: 'GET',
      path: '/hello',
      handler: (request, h) => {
        return 'hello world'
      }
    })

    // General route
    server.route({
      method: 'GET',
      path: '/{path*}',
      handler: (request, h) => {

        if (request.params.path && request.params.path.startsWith('static')) {
          return h.file(`public/client/${request.params.path}`)
        }

        return h.file('public/client/index.html')
      }
    })

  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

startServer()

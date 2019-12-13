'use strict';

const Glue = require('@hapi/glue');
const Manifest = require('./manifest')

const options = {
  relativeTo: __dirname
};

const startServer = async function () {
  try {
    const server = await Glue.compose(Manifest, options);
    await server.start();
    console.log('Server running on %s', server.info.uri);

    server.route({
      method: 'GET',
      path: '/hello',
      handler: (request, h) => {
        return 'hello world';
      }
    });
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();

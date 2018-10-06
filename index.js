'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: process.env.PORT || 3000
});

const init = async () => {

    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return h.file('./public/index.html');
        }
    });

    process.on('unhandledRejection', (err) => {

        console.log(err);
        process.exit(1);
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();


require('dotenv').config();
const Glue = require('glue');
const { manifest, options } = require('./plugins/index');
const { validate } = require('./plugins/basic-auth');

const init = async function () {

    try {

        const server = await Glue.compose(manifest, options);
        server.auth.strategy('simple', 'basic', { validate });

        server.route({
            method: 'GET',
            path: '/',
            options: {
                auth: 'simple'
            },
            handler: (request, h) => {

                return h.file('./public/index.html');
            }
        });

        server.method({
            name: 'redactMap',
            method: require('./methods/redact').redactMap,
            options: {}
        });

        server.method({
            name: 'redact',
            method: require('./methods/redact').redact,
            options: {}
        });

        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }

    process.on('unhandledRejection', (err) => {

        console.log(err);
        process.exit(1);
    });
};

init();

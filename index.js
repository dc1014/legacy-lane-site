const Glue = require('glue');
const { manifest, options } = require('./plugins/index');

const init = async function () {

    try {

        const server = await Glue.compose(manifest, options);
        server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {

                return h.file('./public/index.html');
            }
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

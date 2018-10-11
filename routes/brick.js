const Boom = require('boom');

const register = function (server, options) {

    server.route({
        method: 'GET',
        path: '/bricks',
        async handler(request) {

            const db = request.mongo.db;

            try {
                const result = await db.collection('bricks').find({}).toArray();
                return result;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/bricks/{id}',
        async handler(request) {

            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;

            try {
                const result = await db.collection('bricks').findOne({ _id: new ObjectID(request.params.id) });
                return result;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
    });
};

module.exports = {
    name: 'brickRoutes',
    register,
    version: '0.0.1'
};

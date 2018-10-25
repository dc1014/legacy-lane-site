const { schema: brickSchema } = require('./../models/brick.js');

const Boom = require('boom');

const register = function (server, options) {

    server.route({
        method: 'GET',
        path: '/v1/bricks',
        async handler(request) {

            const db = request.mongo.db;
            let result;
            const term = request.query.q || '';

            try {
                if (term) {
                    result = await db.collection('bricks').find({ $or: [{
                        $text: { $search: term }
                    }, { tags: term }]
                    }).toArray();
                }
                else {
                    result = await db.collection('bricks').find({}).toArray();
                }

                return server.methods.redactMap(result, term);
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/bricks/{id}',
        async handler(request) {

            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;

            try {
                const result = await db.collection('bricks').findOne({ _id: new ObjectID(request.params.id) });
                return server.methods.redact(result);
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
    });
    server.route({
        method: 'POST',
        path: '/v1/bricks',

        async handler(request) {

            const db = request.mongo.db;

            try {
                const result = await db.collection('bricks').insert(request.payload);
                return result.ops;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        },
        options: {
            validate: {
                payload: brickSchema
            }
        }
    });
    server.route({
        method: 'DELETE',
        path: '/v1/bricks/{id}',
        async handler(request) {

            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;

            try {
                return await db.collection('bricks').deleteOne({ _id: new ObjectID(request.params.id) });
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

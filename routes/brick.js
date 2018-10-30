const { schema: brickSchema } = require('./../models/brick.js');
const { schema: claimSchema } = require('./../models/claim.js');
const Joi = require('joi');

const Boom = require('boom');

const register = function (server, options) {

    server.route({
        method: 'GET',
        path: '/v1/bricks',
        async handler(request) {

            const db = request.mongo.db;
            let result;
            const term = request.query.q || '';
            const { skip, limit } = server.methods.skipLimit(request.query.s, request.query.l);

            try {
                if (term) {
                    result = await db.collection('bricks').find({ $or: [{
                        $text: { $search: term }
                    }, { tags: term }]
                    }).skip(skip).limit(limit).toArray();
                }
                else {
                    result = await db.collection('bricks').find().skip(skip).limit(limit).toArray();
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
        method: 'PUT',
        path: '/v1/bricks/{id}',
        async handler(request) {

            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;

            try {
                const result = await db.collection('bricks').updateOne({ _id: new ObjectID(request.params.id) },
                    { $set: request.payload });
                return result;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        },
        options: {
            validate: {
                payload: {
                    classOf: Joi.number().positive().integer(),
                    comment: Joi.string(),
                    constituentId: Joi.string(),
                    email: Joi.string(),
                    firstName: Joi.string(),
                    giftDate: Joi.date(),
                    image: Joi.string().uri({ scheme: /https:*/ }),
                    installedIn: Joi.number().positive().integer(),
                    lastName: Joi.string(),
                    lat: Joi.string(),
                    line1: Joi.string(),
                    line2: Joi.string(),
                    line3: Joi.string(),
                    long: Joi.string(),
                    optIn: Joi.boolean(),
                    tags: Joi.array().items(Joi.string())
                }
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
        method: 'PUT',
        path: '/v1/bricks/{id}/claim',

        async handler(request) {

            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;

            request.payload.ipAdress = request.info.remoteAddress;

            try {
                await db.collection('bricks').updateOne(
                    { _id: new ObjectID(request.params.id) },
                    { $set: { claim: request.payload } }
                );
                return request.payload;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        },
        options: {
            validate: {
                payload: claimSchema
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/bricks/{id}/claim',

        async handler(request) {

            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;

            try {
                const result = await db.collection('bricks').findOne(
                    { _id: new ObjectID(request.params.id), claim: { $exists: 1 } },
                    { _id: 0 }
                );

                return result;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/v1/bricks/{id}/claim',

        async handler(request) {

            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;

            try {
                const result = await db.collection('bricks').updateOne(
                    { _id: new ObjectID(request.params.id) },
                    { $unset: { claim: '' } }
                );

                return result;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/bricks/claims',

        async handler(request) {

            const db = request.mongo.db;
            const { skip, limit } = server.methods.skipLimit(request.query.s, request.query.l);
            const term = request.query.q || '';
            let result;

            try {
                if (term) {

                    result = await db.collection('bricks').find({ $and: [{ $text: { $search: term } }, { claim: { $exists: true } }] }).skip(skip).limit(limit).toArray();
                }
                else {

                    result = await db.collection('bricks').find({ claim: { $exists: true } }).skip(skip).limit(limit).toArray();
                }

                return result;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/v1/bricks/{id}/approvals',

        async handler(request) {

            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;

            request.payload.brickId = new ObjectID(request.params.id);
            request.payload.brick = JSON.parse(request.payload.brick);
            request.payload.claim = JSON.parse(request.payload.claim);

            try {
                await db.collection('bricks').updateOne(
                    { _id: new ObjectID(request.params.id) },
                    { $set: request.payload.brick, $unset: { claim: '' } }
                );

                const approval = await db.collection('approvals').insert(request.payload);

                return approval.ops;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/bricks/{id}/approvals',

        async handler(request) {

            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;
            const { skip, limit } = server.methods.skipLimit(request.query.s, request.query.l);
            const term = request.query.q || '';
            const brickId = new ObjectID(request.params.id);
            let result;

            try {
                if (term) {
                    result = await db.collection('approvals').find({ brickId, $text: { $search: term } }).skip(skip).limit(limit).toArray();
                }
                else {
                    result = await db.collection('approvals').find({ brickId }).skip(skip).limit(limit).toArray();
                }

                return result;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/bricks/{id}/approvals/{approvalId}',

        async handler(request) {

            const db = request.mongo.db;
            const ObjectID = request.mongo.ObjectID;
            const approvalId = new ObjectID(request.params.approvalId);

            try {
                const result = await db.collection('approvals').findOne({ _id: approvalId });

                return result;
            }
            catch (err) {
                throw Boom.internal('Internal MongoDB error', err);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/bricks/tags',

        async handler(request) {

            const db = request.mongo.db;

            try {
                const result = await db.collection('bricks').aggregate([
                    { $unwind: '$tags' },
                    { $group: {
                        _id: '$tags', count: { $sum: 1 }
                    } },
                    { $sort: { tags: -1 } },
                    { $limit: 5 },
                    { $project: { _id: 0, tag: '$_id' } },
                    { $group: { _id: null, tags: { $addToSet: '$tag' } } },
                    { $project: { _id: 0, tags: 1 } }
                ]).toArray();

                return result[0].tags;
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

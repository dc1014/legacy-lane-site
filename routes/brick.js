const { schema: brickSchema } = require('./../models/brick.js');
const { schema: claimSchema } = require('./../models/claim.js');
const { schema: approvalSchema } = require('./../models/approval.js');
const { validate } = require('./../plugins/basic-auth');

const Joi = require('joi');

const Boom = require('boom');

const register = function (server, options) {

    server.auth.strategy('simple', 'basic', { validate });

    server.route({
        method: 'GET',
        path: '/v1/bricks',
        config: {
            description: 'Get Bricks',
            notes: 'Returns an array of redacted bricks',
            tags: ['api', 'Brick'],
            handler: async function (request) {

                const db = request.mongo.db;
                let result;
                const term = request.query.q || '';
                const { skip, limit } = server.methods.skipLimit(request.query.s, request.query.l);

                try {
                    if (term) {
                        result = await db.collection('bricks').find({ $or: [{
                            $text: { $search: term, $caseSensitive: false }
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
            },
            validate: {
                query: {
                    l: Joi.number().integer().min(1).max(10).default(10),
                    s: Joi.number().integer().min(0).default(0),
                    q: Joi.string().optional()
                }
            },
            response: {
                schema: Joi.array().items(brickSchema)
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/admin/bricks',
        config: {
            description: 'Get unredacted bricks',
            notes: 'Returns an array of unredacted bricks',
            tags: ['api', 'Brick'],
            handler: async function (request) {

                const db = request.mongo.db;
                let result;
                const term = request.query.q || '';
                const { skip, limit } = server.methods.skipLimit(request.query.s, request.query.l);

                try {
                    if (term) {
                        result = await db.collection('bricks').find({ $or: [{
                            $text: { $search: term, $caseSensitive: false }
                        }, { tags: term }]
                        }).skip(skip).limit(limit).toArray();
                    }
                    else {
                        result = await db.collection('bricks').find().skip(skip).limit(limit).toArray();
                    }

                    return result;
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },
            auth: 'simple',
            validate: {
                query: {
                    l: Joi.number().integer().min(1).max(10).default(10),
                    s: Joi.number().integer().min(0).default(0),
                    q: Joi.string().optional()
                }
            },
            response: {
                schema: Joi.array().items(brickSchema)
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/bricks/{id}',
        config: {
            description: 'Get Brick',
            notes: 'Returns a redacted brick',
            tags: ['api', 'Brick'],
            handler: async function (request) {

                const db = request.mongo.db;
                const ObjectID = request.mongo.ObjectID;

                try {
                    const result = await db.collection('bricks').findOne({ _id: new ObjectID(request.params.id) });
                    return server.methods.redact(result);
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },
            response: {
                schema: brickSchema
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/admin/bricks/{id}',
        config: {
            description: 'Get Unredacted Brick',
            notes: 'Returns an unredacted brick',
            tags: ['api', 'Brick'],
            handler: async function (request) {

                const db = request.mongo.db;
                const ObjectID = request.mongo.ObjectID;

                try {
                    const result = await db.collection('bricks').findOne({ _id: new ObjectID(request.params.id) });

                    return result;
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },
            auth: 'simple',
            response: {
                schema: brickSchema
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/v1/bricks/{id}',
        config: {
            description: 'PUT Brick',
            notes: 'Update a brick',
            tags: ['api', 'Brick'],
            handler: async function (request) {

                const db = request.mongo.db;
                const ObjectID = request.mongo.ObjectID;

                try {
                    const result = await db.collection('bricks').findOneAndUpdate(
                        { _id: new ObjectID(request.params.id) },
                        { $set: request.payload },
                        { returnOriginal: false }
                    );

                    return result.value;
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },
            auth: 'simple',
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
                    lat: Joi.number(),
                    line1: Joi.string(),
                    line2: Joi.string(),
                    line3: Joi.string(),
                    long: Joi.number(),
                    optIn: Joi.boolean(),
                    tags: Joi.array().items(Joi.string())
                }
            },
            response: {
                schema: brickSchema
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/v1/bricks/{id}',
        config: {
            description: 'DELETE Brick',
            notes: 'Delete a brick',
            tags: ['api', 'Brick'],
            handler: async function (request) {

                const db = request.mongo.db;
                const ObjectID = request.mongo.ObjectID;

                try {
                    const result = await db.collection('bricks').deleteOne(
                        { _id: new ObjectID(request.params.id) },
                    );

                    return result;
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },
            auth: 'simple'
        }
    });

    server.route({
        method: 'POST',
        path: '/v1/bricks',
        config: {
            description: 'POST Brick',
            notes: 'Creates a brick',
            tags: ['api', 'Brick'],
            handler: async function (request) {

                const db = request.mongo.db;

                try {
                    const result = await db.collection('bricks').insert(request.payload);
                    return result.ops[0];
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },
            auth: 'simple',
            validate: {
                payload: brickSchema
            },
            response: {
                schema: brickSchema
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/v1/bricks/{id}/claim',
        config: {
            description: 'Create a Claim',
            notes: 'PUTs a claim on a brick. Used during request approval to update a brick.',
            tags: ['api', 'Claim'],
            handler: async function (request) {

                const db = request.mongo.db;
                const ObjectID = request.mongo.ObjectID;

                request.payload.ipAddress = request.info.remoteAddress;

                try {
                    const result = await db.collection('bricks').findOneAndUpdate(
                        { _id: new ObjectID(request.params.id) },
                        { $set: { claim: request.payload } },
                        { returnOriginal: false }
                    );

                    return result.value;
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },
            validate: {
                payload: claimSchema
            },
            response: {
                schema: brickSchema
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/bricks/{id}/claim',
        config: {
            description: 'Get a Claim',
            notes: 'Gets a claim on a brick',
            tags: ['api', 'Claim'],
            handler: async function (request) {

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
            },
            auth: 'simple',
            response: {
                schema: brickSchema
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/v1/bricks/{id}/claim',
        config: {
            description: 'Delete a Claim',
            notes: 'Deletes a claim on a brick',
            tags: ['api', 'Claim'],
            handler: async function (request) {

                const db = request.mongo.db;
                const ObjectID = request.mongo.ObjectID;

                try {
                    const result = await db.collection('bricks').findOneAndUpdate(
                        { _id: new ObjectID(request.params.id) },
                        { $unset: { claim: '' } },
                        { returnOriginal: false }
                    );

                    return result.value;
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },
            auth: 'simple',
            response: {
                schema: brickSchema
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/bricks/claims',
        config: {
            description: 'Get all Claims',
            notes: 'Gets all bricks with a claim on them',
            tags: ['api', 'Claim'],
            handler: async function (request) {

                const db = request.mongo.db;
                const { skip, limit } = server.methods.skipLimit(request.query.s, request.query.l);
                const term = request.query.q || '';
                let result;

                try {
                    if (term) {

                        result = await db.collection('bricks').find({ $and: [
                            { $text: { $search: term, $caseSensitive: false } },
                            { claim: { $exists: true }
                            }] }).skip(skip).limit(limit).toArray();
                    }
                    else {

                        result = await db.collection('bricks').find({ claim: { $exists: true } }).skip(skip).limit(limit).toArray();
                    }

                    return result;
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },
            auth: 'simple',
            validate: {
                query: {
                    l: Joi.number().integer().min(1).max(10).default(10),
                    s: Joi.number().integer().min(0).default(0),
                    q: Joi.string().optional()
                }
            },
            response: {
                schema: Joi.array().items(brickSchema)
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/v1/bricks/{id}/approvals',
        config: {
            description: 'POST an approval',
            notes: 'Allows a user to update a brick based on the claim object.',
            tags: ['api', 'Approval'],
            handler: async function (request) {

                const db = request.mongo.db;
                const ObjectID = request.mongo.ObjectID;

                request.payload.brickId = new ObjectID(request.params.id);
                request.payload.ipAddress = request.info.remoteAddress;

                try {
                    await db.collection('bricks').updateOne(
                        { _id: new ObjectID(request.params.id) },
                        { $set: request.payload.brick, $unset: { claim: '' } }
                    );

                    const result = await db.collection('approvals').insert(request.payload);

                    return result.ops[0];
                }
                catch (err) {
                    throw Boom.internal('Internal MongoDB error', err);
                }
            },
            auth: 'simple',
            validate: {
                payload: approvalSchema
            },
            response: {
                schema: approvalSchema
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/bricks/{id}/approvals',
        config: {
            description: 'GET all approvals for a brick',
            notes: 'Gets all Approvals for a brick.',
            tags: ['api', 'Approval'],
            handler: async function (request) {

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
            },
            auth: 'simple',
            validate: {
                query: {
                    l: Joi.number().integer().min(1).max(10).default(10),
                    s: Joi.number().integer().min(0).default(0),
                    q: Joi.string().optional()
                }
            },
            response: {
                schema: Joi.array().items(approvalSchema)
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/bricks/{id}/approvals/{approvalId}',
        config: {
            description: 'GET a specific brick approval',
            notes: 'Gets a specific approval for a brick.',
            tags: ['api', 'Approval'],
            handler: async function (request) {

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
            },
            auth: 'simple',
            response: {
                schema: approvalSchema
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/v1/login',
        config: {
            description: 'POST a login',
            notes: 'User logs in.',
            tags: ['api', 'login'],
            handler: async function (request) {

                return true;
            },
            auth: 'simple'
        }
    });

    server.route({
        method: 'GET',
        path: '/v1/bricks/tags',
        config: {
            description: 'Get top five tags of bricks.',
            notes: 'Gets the top five tags of bricks.',
            tags: ['api', 'Brick'],
            handler: async function (request) {

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
            },
            response: {
                schema: Joi.array().items(Joi.string())
            }
        }
    });
};

module.exports = {
    name: 'brickRoutes',
    register,
    version: '0.0.4'
};

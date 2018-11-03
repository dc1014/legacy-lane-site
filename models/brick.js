const Joi = require('joi');
const { schema: claimSchema } = require('./claim');

const collection = 'bricks';

const schema = Joi.object().keys({
    _id: Joi.object(),
    claim: claimSchema, // redacted
    classOf: Joi.number().positive().integer(), // searchable, redactable
    comment: Joi.string().default('').allow(''), // searchable
    constituentId: Joi.string(), // redacted
    email: Joi.string().email().lowercase(), // searchable, redactable
    firstName: Joi.string(), // searchable, redactable
    giftDate: Joi.date(),
    installedIn: Joi.number().positive().integer(),
    lastName: Joi.string(), // searchable, redactable
    lat: Joi.number(),
    line1: Joi.string().default('').allow(''), // searchable
    line2: Joi.string().default('').allow(''), // searchable
    line3: Joi.string().default('').allow(''), // searchable
    long: Joi.number(),
    image: Joi.string().uri({ scheme: /https:*/ }),
    optIn: Joi.boolean(), // redacted
    phoneNumber: Joi.string(), // redacted
    tags: Joi.array().items(Joi.string()).default([], 'empty tags array') // searchable
});

module.exports = { collection, schema };

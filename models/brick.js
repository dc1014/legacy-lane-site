const Joi = require('joi');

const collection = 'bricks';

const { schema: claim } = require('./claim.js');

const schema = Joi.object().keys({
    _id: Joi.object(),
    claim: claim.optional(),
    classOf: Joi.number().positive().integer(), // searchable, redactable
    comment: Joi.string().required(), // searchable
    email: Joi.string().email().lowercase(), // searchable, redactable
    firstName: Joi.string(), // searchable, redactable
    giftDate: Joi.date(),
    installedIn: Joi.number().positive().integer(),
    lastName: Joi.string(), // searchable, redactable
    lat: Joi.string(),
    line1: Joi.string().required(), // searchable
    line2: Joi.string().required().default(''), // searchable
    line3: Joi.string().required().default(''), // searchable
    long: Joi.string(),
    image: Joi.string().uri({
        scheme: [
            'https://'
        ]
    }),
    optIn: Joi.boolean(),
    tags: Joi.array().items(Joi.string()).default([], 'empty tags array') // searchable
});

module.exports = { collection, schema };

const Joi = require('joi');

const collection = 'bricks';

const { schema: request } = require('./request.js');

const schema = Joi.object().keys({
    classOf: Joi.number().positive().integer(),
    comment: Joi.string().required(),
    email: Joi.string().email().lowercase(),
    firstName: Joi.string(),
    giftDate: Joi.date(),
    installedIn: Joi.number().positive().integer(),
    lastName: Joi.string(),
    lat: Joi.string(),
    line1: Joi.string().required(),
    line2: Joi.string().required().default(''),
    line3: Joi.string().required().default(''),
    long: Joi.string(),
    image: Joi.string().uri({
        scheme: [
            'https://'
        ]
    }),
    optIn: Joi.boolean(),
    request: request.optional(),
    tags: Joi.array().items(Joi.string()).default([], 'empty tags array')
});

module.exports = { collection, schema };

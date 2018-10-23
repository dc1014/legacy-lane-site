const Joi = require('joi');

const collection = 'bricks';

const { schema: request } = require('./request.js');

const schema = Joi.object().keys({
    classOf: Joi.number().positive().integer(),
    comment: Joi.string().required(),
    email: Joi.string().email(),
    firstName: Joi.string(),
    giftDate: Joi.date(),
    installedIn: Joi.number().positive().integer(),
    lastName: Joi.string(),
    lat: Joi.string(),
    line1: Joi.string().required(),
    line2: Joi.string().required(),
    line3: Joi.string().required(),
    long: Joi.string(),
    image: Joi.string().uri({
        scheme: [
            'https://'
        ]
    }),
    optIn: Joi.boolean(),
    request,
    tags: Joi.array().items(Joi.string()).default([], 'empty tags array')
});

module.exports = { collection, schema };

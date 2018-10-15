const Joi = require('joi');

const collection = 'bricks';

const schema = Joi.object().keys({
    classOf: Joi.number().positive().integer(),
    constituentId: Joi.string(),
    comment: Joi.string(),
    email: Joi.string().email(),
    firstName: Joi.string(),
    giftDate: Joi.date(),
    importId: Joi.string(),
    installedIn: Joi.number().positive().integer(),
    lastName: Joi.string(),
    lat: Joi.string(),
    line1: Joi.string(),
    line2: Joi.string(),
    line3: Joi.string(),
    long: Joi.string(),
    optIn: Joi.boolean(),
    tags: Joi.array().items(Joi.string())
});

module.exports = { collection, schema };

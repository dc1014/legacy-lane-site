const Joi = require('joi');

const collection = 'requests';

const schema = Joi.object().keys({
    approved: Joi.boolean(),
    brickId: Joi.string(),
    comment: Joi.string(),
    email: Joi.string().email(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string(),
    tags: Joi.array().items(Joi.string()).required(),
    timeStamp: Joi.date().timestamp().default(Date.now)
});

module.exports = { collection, schema };

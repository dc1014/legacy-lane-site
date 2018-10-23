const Joi = require('joi');

const collection = 'users';

const schema = Joi.object().keys({
    firstName: Joi.boolean(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    timeStamp: Joi.date().timestamp().default(Date.now)
});

module.exports = { collection, schema };

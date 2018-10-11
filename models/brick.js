const Joi = require('joi');

const collection = 'bricks';

const schema = Joi.object().keys({
    classOf: Joi.number().positive().integer(),
    email: Joi.string().email(),
    firstName: Joi.string(),
    importId: Joi.string(),
    installedIn: Joi.number().positive().integer(),
    lastName: Joi.string(),
    line1: Joi.string(),
    line2: Joi.string(),
    line3: Joi.string()
});

module.exports = { collection, schema };

const Joi = require('joi');

const collection = 'approvals';
const { schema: claim } = require('./claim');

const schema = Joi.object().keys({
    _id: Joi.object(),
    claim, // nested search
    brickId: Joi.object(), // searchable, private
    brick: Joi.object().keys({
        comment: Joi.string(),
        email: Joi.string().email().lowercase(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        optIn: Joi.boolean(),
        tags: Joi.array().items(Joi.string())
    }),
    user: Joi.string().lowercase().required() // searchable, private
});

module.exports = { collection, schema };

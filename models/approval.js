const Joi = require('joi');

const collection = 'approvals';

const schema = Joi.object().keys({
    _id: Joi.object(),
    claim: Joi.object(), // nested search
    brickId: Joi.object(),
    brick: Joi.object(),
    user: Joi.string().lowercase().required() // searchable, private
});

module.exports = { collection, schema };

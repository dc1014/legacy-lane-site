const Joi = require('joi');

const collection = 'approvals';
const { schema: claim } = require('./claim');

const schema = Joi.object().keys({
    _id: Joi.object(),
    claim, // nested search
    brickId: Joi.object(), // searchable, private
    brick: Joi.object(),
    user: Joi.string().lowercase().required() // searchable, private
});

module.exports = { collection, schema };

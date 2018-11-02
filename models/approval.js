const Joi = require('joi');
const { schema: claimSchema } = require('./claim');
const { schema: brickSchema } = require('./brick');

const collection = 'approvals';

const schema = Joi.object().keys({
    _id: Joi.object(),
    claim: claimSchema, // nested search
    brickId: Joi.object(),
    brick: brickSchema,
    ipAddress: Joi.string(),
    user: Joi.string().lowercase().required() // searchable, private
});

module.exports = { collection, schema };

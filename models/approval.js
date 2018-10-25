const Joi = require('joi');

const collection = 'approvals';

const { schema: brick } = require('./brick.js');

const schema = Joi.object().keys({
    _id: Joi.object(),
    activity: Joi.date().timestamp().default(Date.now, 'request creation date'),
    approved: Joi.boolean().default(false),
    brick,
    denied: Joi.boolean().default(false),
    user: Joi.string().lowercase().required()
}).without('approved', ['denied']);

module.exports = { collection, schema };

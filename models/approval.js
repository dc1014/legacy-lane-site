const Joi = require('joi');

const collection = 'approvals';

const schema = Joi.object().keys({
    _id: Joi.object(),
    activity: Joi.date().timestamp().default(Date.now, 'request creation date'),
    approved: Joi.boolean().default(false),
    brickId: Joi.object(),
    brick: Joi.object(),
    denied: Joi.boolean(),
    user: Joi.string().lowercase().required()
}).without('approved', ['denied']);

module.exports = { collection, schema };

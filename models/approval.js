const Joi = require('joi');

const collection = 'approvals';

const schema = Joi.object().keys({
    _id: Joi.object(),
    brickId: Joi.object(),
    brick: Joi.object(),
    user: Joi.string().lowercase().required()
});

module.exports = { collection, schema };

const Joi = require('joi');

const schema = Joi.object().keys({
    activity: Joi.date().timestamp().default(Date.now, 'request creation date'),
    comment: Joi.string(),
    email: Joi.string().email().lowercase().required(), // searchable, private
    firstName: Joi.string().required(), // searchable, private
    ipAddress: Joi.string(),
    lastName: Joi.string().required(), // searchable, private
    optIn: Joi.boolean().default(false),
    phoneNumber: Joi.string().required(), // searchable, private
    tags: Joi.array().items(Joi.string())
});

module.exports = { schema };

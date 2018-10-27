const Joi = require('joi');

const schema = Joi.object().keys({
    comment: Joi.string(),
    email: Joi.string().email().lowercase().required(), // searchable, private
    firstName: Joi.string().required(), // searchable, private
    lastName: Joi.string().required(), // searchable, private
    phoneNumber: Joi.string().required(), // searchable, private
    tags: Joi.array().items(Joi.string()),
    activity: Joi.date().timestamp().default(Date.now, 'request creation date'),
    optIn: Joi.boolean().default(false),
    ipAddress: Joi.string()
});

module.exports = { schema };

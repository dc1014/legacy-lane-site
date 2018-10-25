const Joi = require('joi');

const schema = Joi.object().keys({
    comment: Joi.string(),
    email: Joi.string().email().lowercase(), // should copy to brick?
    firstName: Joi.string(), // determine to copy by opt in
    lastName: Joi.string(), // determine to copy by opt in
    phoneNumber: Joi.string(), // not to copy to brick
    tags: Joi.array().items(Joi.string()),
    activity: Joi.date().timestamp().default(Date.now, 'request creation date'),
    optIn: Joi.boolean().default(false)
});

module.exports = { schema };

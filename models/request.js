const Joi = require('joi');

const collection = 'requests';

const schema = Joi.object().keys({
    approved: Joi.boolean(),
    comment: Joi.string(),
    delete: Joi.boolean(), // removes from document
    email: Joi.string().email().required(), // should copy to brick?
    firstName: Joi.string().required(), // determine to copy by opt in
    lastName: Joi.string().required(), // determine to copy by opt in
    phoneNumber: Joi.string().required(), // not to copy to brick
    tags: Joi.array().items(Joi.string()),
    createdTimeStamp: Joi.date().timestamp().default(Date.now),
    user: Joi.string(),
    optIn: Joi.boolean().default(false),
    userTimeStamp: Joi.date().timestamp().default(Date.now)
}).without('createdTimeStamp', ['approvalTimeStamp']);

module.exports = { collection, schema };

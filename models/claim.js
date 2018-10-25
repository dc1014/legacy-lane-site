const Joi = require('joi');

const collection = 'claims';

const schema = Joi.object().keys({
    approved: Joi.boolean(),
    comment: Joi.string(),
    delete: Joi.boolean(), // removes from document
    email: Joi.string().email().lowercase().required(), // should copy to brick?
    firstName: Joi.string().required(), // determine to copy by opt in
    lastName: Joi.string().required(), // determine to copy by opt in
    phoneNumber: Joi.string().required(), // not to copy to brick
    tags: Joi.array().items(Joi.string()),
    createdTimeStamp: Joi.date().timestamp().default(Date.now, 'request creation date'),
    user: Joi.string(),
    optIn: Joi.boolean().default(false),
    userTimeStamp: Joi.date().timestamp().default(Date.now, 'user action date')
}).without('createdTimeStamp', ['approvalTimeStamp', 'approved', 'deleted', 'user', 'userTimeStamp']);

module.exports = { collection, schema };

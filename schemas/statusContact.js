const Joi = require('joi');

const statusContact = Joi.object({
    favorite: Joi.bool().required()
});

module.exports = statusContact;
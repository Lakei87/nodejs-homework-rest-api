const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

// Mongoose schema
const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

// Joi schema
const addSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required()
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};
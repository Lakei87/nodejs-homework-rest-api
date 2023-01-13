const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Mongoose schema
const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Set password for user'],
        },
        email: {
            type: String,
            match: emailRegexp,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: String
    },
    { versionKey: false }
);

userSchema.post("save", handleMongooseError);

// Joi schemas
const registerAndLoginSchema = Joi.object(
    {
        password: Joi.string().min(7).max(20).required(),
        email: Joi.string().pattern(emailRegexp).required(),
    }
);

const schemas = {
    registerAndLoginSchema,
};

const User = model("user", userSchema);
module.exports = {
    User,
    schemas,
};
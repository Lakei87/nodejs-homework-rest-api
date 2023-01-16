const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const { User } = require('../../models/user');
const { httpError } = require('../../helpers');

const register = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (user) {
        throw httpError(409, "Email in use");
    };

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User
        .create({ ...req.body, password: hashPassword, avatarURL });

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription
    });

};

module.exports = register;
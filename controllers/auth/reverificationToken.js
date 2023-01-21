const sgMail = require('@sendgrid/mail');

require('dotenv').config();
const { User } = require('../../models/user');
const { httpError } = require('../../helpers');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const reverificationToken = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw httpError(404, "User not found");
    };
    if (user.verify) {
        throw httpError(400, "Verification has already been passed");
    };

    const msg = {
        to: email,
        from: 'monastyrskyis@gmail.com',
        subject: 'Verification email',
        html: `<a target="_blank" href='http://localhost:3000/api/auth/verify/${user.verificationToken}'>Нажмите чтобы подтвердить свой email</a>`
    };

    sgMail
        .send(msg)
        .then(() => console.log("Email send"))
        .catch(error => console.error(error))
    
    res.json({
        "message": "Verification email sent"
    });
};

module.exports = reverificationToken;
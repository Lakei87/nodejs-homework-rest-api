const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

require('dotenv').config();
const { User } = require('../../models/user');
const { httpError, sendEmail } = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  };
  
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  
  const newUser = await User
    .create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
  
  const msg = {
    to: email,
    subject: 'Registration',
    html: `<a target="_blank" href='http://localhost:3000/api/auth/verify/${verificationToken}'>Please, confirm your email address</a>`
  };

  await sendEmail(msg);
      
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription
  });
};

module.exports = register;
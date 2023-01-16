const fs = require('fs/promises');
const path = require('path');

const { User } = require('../../models/user');
const { resizingAvatar } = require('../../helpers');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('public', 'avatars', filename);
    resizingAvatar(avatarURL);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL
    });
};

module.exports = updateAvatar;
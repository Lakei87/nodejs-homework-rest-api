const Jimp = require('jimp');

const resizingAvatar = async (avatarPath) => {
    try {
        const avatar = await Jimp.read(avatarPath);
        avatar
            .resize(250, 250)
            .write(avatarPath);
    } catch (error) {
        console.error(error);
    };
};

module.exports = resizingAvatar;
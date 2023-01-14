const { User } = require("../../models/user");
const { httpError } = require("../../helpers");

const logout = async (req, res) => {
    const { _id } = req.user;

    const user = await User.findByIdAndUpdate(_id, { token: "" });
    console.log(user)
    if (!user) {
        throw httpError(401, "Not authorized");
    }

    res.status(204).json();
};

module.exports = logout;
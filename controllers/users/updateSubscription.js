const { httpError } = require("../../helpers");
const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
    const { _id } = req.user;

    const user = await User.findByIdAndUpdate(_id, req.body);
    if (!user) {
        throw httpError(401, "Not authorized");
    };

    res.json({
        message: "subscription update success"
    });
};

module.exports = updateSubscription;
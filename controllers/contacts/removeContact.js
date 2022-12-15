const Contact = require('../../models/contact');

const { httpError } = require('../../helpers');

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);

    if (!result) {
        throw httpError(404, `Was not found contact with id: ${id}`);
    };

    res.json({
        message: "Delete success"
    });
};

module.exports = removeContact;
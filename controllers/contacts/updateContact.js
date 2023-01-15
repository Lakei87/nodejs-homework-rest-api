const { Contact } = require('../../models/contact');

const { httpError } = require('../../helpers');

const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);

    if (!result) {
        throw httpError(404, `Was not found contact with id: ${id}`);
    };

    res.json(result);
};

module.exports = updateContact;
const Contact = require('../../models/contact');

const { httpError } = require('../../helpers');

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const isBodyEmpty = Object.keys(req.body).length === 0;

    if (isBodyEmpty) {
        throw httpError(400, "missing field favorite");
    };

    const result = await Contact.findByIdAndUpdate(id, req.body);

    if (!result) {
        throw httpError(404, `Was not found contact with id: ${id}`);
    };

    const updatedContact = await Contact.findById(id);
    res.json(updatedContact);
};

module.exports = updateStatusContact;
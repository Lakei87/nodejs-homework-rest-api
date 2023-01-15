const { Contact } = require('../../models/contact');

const { httpError } = require('../../helpers');

const updateStatusContact = async (req, res) => {
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});

    if (!result) {
        throw httpError(404, `Was not found contact with id: ${id}`);
    };

    res.json(result);
};

module.exports = updateStatusContact;
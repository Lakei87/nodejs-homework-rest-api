const Contact = require('../../models/contact');
const { httpError } = require('../../helpers');

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
        throw httpError(404, `Was not found contact with id: ${id}`);
    };

    res.json(result);
};

module.exports = getById;
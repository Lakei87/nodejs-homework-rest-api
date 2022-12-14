const express = require('express');

const {
    listContacts,
    getById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
} = require('../../controllers/contacts');

const { asyncWrapper } = require('../../helpers');

const { validateBody } = require('../../middlewares');

const { contacts } = require('../../schemas');

const router = express.Router();

router.get('/', asyncWrapper(listContacts));

router.get('/:id', asyncWrapper(getById));

router.post('/', validateBody(contacts), asyncWrapper(addContact));

router.delete('/:id', asyncWrapper(removeContact));

router.put('/:id', validateBody(contacts), asyncWrapper(updateContact));

router.patch('/:id/favorite', asyncWrapper(updateStatusContact));


module.exports = router;

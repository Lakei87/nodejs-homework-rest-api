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
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', asyncWrapper(listContacts));

router.get('/:id', asyncWrapper(getById));

router.post('/',
    validateBody(schemas.addSchema),
    asyncWrapper(addContact));

router.delete('/:id', asyncWrapper(removeContact));

router.put('/:id',
    validateBody(schemas.addSchema),
    asyncWrapper(updateContact));

router.patch('/:id/favorite',
    validateBody(schemas.updateFavoriteSchema),
    asyncWrapper(updateStatusContact));

module.exports = router;

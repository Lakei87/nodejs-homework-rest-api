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
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/',
    authenticate,
    asyncWrapper(listContacts));

router.get('/:id',
    authenticate,
    asyncWrapper(getById));

router.post('/',
    authenticate,
    validateBody(schemas.addSchema),
    asyncWrapper(addContact));

router.delete('/:id',
    authenticate,
    asyncWrapper(removeContact));

router.put('/:id',
    authenticate,
    validateBody(schemas.addSchema),
    asyncWrapper(updateContact));

router.patch('/:id/favorite',
    authenticate,
    validateBody(schemas.updateFavoriteSchema),
    asyncWrapper(updateStatusContact));

module.exports = router;

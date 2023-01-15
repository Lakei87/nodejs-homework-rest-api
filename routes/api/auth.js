const express = require("express");

const { register, login, logout, current, updateSubscription } = require('../../controllers/auth');
const { asyncWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.get('/login',
    validateBody(schemas.registerAndLoginSchema),
    asyncWrapper(login));

router.post('/register',
    validateBody(schemas.registerAndLoginSchema),
    asyncWrapper(register));

router.post('/logout',
    authenticate,
    asyncWrapper(logout));

router.get('/current',
    authenticate,
    asyncWrapper(current));

router.patch('/',
    authenticate,
    validateBody(schemas.updateSubscriptionSchema),
    asyncWrapper(updateSubscription))

module.exports = router;
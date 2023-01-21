const express = require("express");

const {
    register,
    login,
    logout,
    current,
    updateSubscription,
    updateAvatar, 
    verificationToken} = require('../../controllers/auth');
const { asyncWrapper } = require('../../helpers');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.get('/login',
    validateBody(schemas.registerAndLoginSchema),
    asyncWrapper(login));
    
router.get('/current',
    authenticate,
    asyncWrapper(current));

router.get('/verify/:verificationToken',
    asyncWrapper(verificationToken));

router.post('/register',
    validateBody(schemas.registerAndLoginSchema),
    asyncWrapper(register));

router.post('/logout',
    authenticate,
    asyncWrapper(logout));

router.patch('/',
    authenticate,
    validateBody(schemas.updateSubscriptionSchema),
    asyncWrapper(updateSubscription));

router.patch('/avatars',
    authenticate,
    upload.single("avatar"),
    asyncWrapper(updateAvatar));

module.exports = router;
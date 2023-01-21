const express = require("express");

const {
    logout,
    current,
    updateSubscription,
    updateAvatar} = require('../../controllers/users');
const { asyncWrapper } = require('../../helpers');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();
    
router.get('/current',
    authenticate,
    asyncWrapper(current));

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
const express = require("express");

const { register, login, logout } = require('../../controllers/auth');
const { asyncWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.get("/login",
    validateBody(schemas.registerAndLoginSchema),
    asyncWrapper(login));

router.post("/register",
    validateBody(schemas.registerAndLoginSchema),
    asyncWrapper(register));

router.post("/logout",
    asyncWrapper(authenticate),
    asyncWrapper(logout));

module.exports = router;
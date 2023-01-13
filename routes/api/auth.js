const express = require("express");

const { register, login } = require('../../controllers/auth');
const { asyncWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.get("/login",
    validateBody(schemas.registerAndLoginSchema),
    asyncWrapper(login));

router.post("/register",
    validateBody(schemas.registerAndLoginSchema),
    asyncWrapper(register));

module.exports = router;
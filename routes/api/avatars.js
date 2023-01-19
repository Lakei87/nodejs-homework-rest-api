const express = require('express');
const path = require('path');

const fileDir = path.join(__dirname, '../../', 'public', 'avatars');

const router = express.Router();

router.use('/', express.static(fileDir));

module.exports = router;
const express = require('express');
const { createUser, getOneUser } = require('../Controller/userController');
const router = express.Router();

router.post ('/' , createUser)
router.get ('/' , getOneUser)

module.exports = router;
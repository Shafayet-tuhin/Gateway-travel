const express = require('express');
const { createUser, getOneUser, updateUser } = require('../Controller/userController');
const router = express.Router();

router.post ('/' , createUser)
router.get ('/' , getOneUser)
router.put('/:id' , updateUser)

module.exports = router;
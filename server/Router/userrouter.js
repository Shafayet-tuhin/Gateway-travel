const express = require('express');
const { createUser, getOneUser, updateUser, allUsers, changeRole } = require('../Controller/userController');
const router = express.Router();

router.post ('/' , createUser)
router.get('/:id' , allUsers)
router.get ('/' , getOneUser)
router.put('/:id' , updateUser)
router.patch('/:id' , changeRole)

module.exports = router;
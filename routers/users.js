const express = require('express');
let router = express.Router();
let usersControllers = require('../controllers/users');

router.get('/users', usersControllers.users);
router.get('/add-users', usersControllers.usersAdd);

module.exports = router;
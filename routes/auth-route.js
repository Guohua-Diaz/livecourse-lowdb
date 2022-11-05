const express = require('express');
const router = express.Router();


const { createUser, loginUser, authenticationMiddleware, welcomeUser} = require('../controllers/auth-controller');

router.post('/signup', createUser);

router.post('/login', loginUser);

router.get('/secret', authenticationMiddleware, welcomeUser);

// router.delete('/:id', deleteUser);

module.exports = router;
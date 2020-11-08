const router = require('express').Router();
const { signIn, logIn } = require('./controller');
const MiddlewareUsers = require('./middleware.js');

const validationUsers = new MiddlewareUsers;

router.post('/signin', validationUsers.dataRight, signIn);
router.post('/login', logIn);

module.exports = router;
const router = require('express').Router();
const { signIn, logIn } = require('./controller');
const MiddlewareUsers = require('./middleware.js');

const validationUsers = new MiddlewareUsers;

router.post('/signIn', validationUsers.dataRight, signIn);
router.post('/logIn', logIn);

module.exports = router;
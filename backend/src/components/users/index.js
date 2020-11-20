const router = require('express').Router();
const { signIn, logIn, getUsers, putUser, delUser } = require('./controller');
const MiddlewareUsers = require('./middleware.js');

const validationUsers = new MiddlewareUsers;

router.post('/signin', validationUsers.dataRight, signIn);
router.post('/login', logIn);
router.get('/users', validationUsers.profile, getUsers);
router.put('/user', validationUsers.profile, putUser);
router.delete('/user/:ID', validationUsers.profile, delUser);

module.exports = router;
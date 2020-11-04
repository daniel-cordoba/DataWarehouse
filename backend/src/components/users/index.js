const router = require('express').Router();
const middelware = require('./middelware');

const { signIn, logIn } = require('./controller');

router.post('/signIn', middelware, signIn);
router.post('/logIn', logIn);

module.exports = router;
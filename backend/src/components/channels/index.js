const router = require('express').Router();
const Channels = require('./controller');
const MiddlewareChannels = require('./middleware.js');

const channels = new Channels;
const middleware = new MiddlewareChannels;

router.get('/channels', middleware.profile, channels.getChannels);
router.post('/channel', middleware.profile, channels.addChannel);
router.put('/channel', middleware.profile, channels.editChannel);
router.delete('/channel/:ID', middleware.profile, channels.delChannel);

module.exports = router;
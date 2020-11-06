const router = require('express').Router();
const Contacts = require('./controller');
const MiddlewareContacts = require('./middleware.js');

const middleware = new MiddlewareContacts;
const contact = new Contacts;

router.post('/contact', middleware.profile, middleware.emailRight, contact.addContact);
router.put('/contact', middleware.profile, middleware.emailRight2, middleware.exist, contact.editContact);
router.delete('/contact/:ID', middleware.profile, contact.delContact);


module.exports = router;
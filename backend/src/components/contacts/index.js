const router = require('express').Router();
const Contacts = require('./controller');
const MiddlewareContacts = require('./middleware.js');

const validationContacts = new MiddlewareContacts;
const contact = new Contacts;

router.post('/contact', contact.addContact);
router.put('/contact', contact.editContact);
router.delete('/contact/:ID', contact.delContact);


module.exports = router;
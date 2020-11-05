const router = require('express').Router();
const { addRegion, addCountry, addCity } = require('./controller');
const MiddlewareUsers = require('./middleware.js');

const validationUsers = new MiddlewareUsers;

router.post('/region', addRegion);
router.post('/country', addCountry);
router.post('/city', addCity);

/*router.put('/region', );
router.put('/country', );
router.put('/city', );

router.delete('/region', );
router.delete('/country', );
router.delete('/city', ); */

module.exports = router;
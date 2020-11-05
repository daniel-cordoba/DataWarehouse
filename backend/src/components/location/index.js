const router = require('express').Router();
//const { addRegion, addCountry, addCity, putRegion } = require('./controller');
const Locations = require('./controller');
const MiddlewareLocations = require('./middleware.js');

const locations = new Locations;
const validationLocations = new MiddlewareLocations;

router.post('/region', locations.addRegion);
router.post('/country', locations.addCountry);
router.post('/city', locations.addCity);

router.put('/region', locations.putRegion);
router.put('/country', locations.putCountry);
router.put('/city', locations.putCity);

router.delete('/region/:ID', locations.delRegion);
router.delete('/country/:ID', locations.delCountry);
router.delete('/city/:ID', locations.delCity); 

module.exports = router;
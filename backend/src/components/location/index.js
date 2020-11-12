const router = require('express').Router();
const Locations = require('./controller');
const MiddlewareLocations = require('./middleware.js');

const locations = new Locations;
const middleware = new MiddlewareLocations;

router.get('/regions', middleware.profile, locations.getRegion);
router.get('/countries', middleware.profile, locations.getCountry);
router.get('/cities', middleware.profile, locations.getCity);

router.post('/region', middleware.repeatRegion, middleware.profile, locations.addRegion);
router.post('/country', middleware.repeatCountry, middleware.profile, locations.addCountry);
router.post('/city', middleware.repeatCity, middleware.profile, locations.addCity);

router.put('/region', middleware.profile, middleware.existRegion, locations.putRegion);
router.put('/country', middleware.profile, middleware.existCountry, locations.putCountry);
router.put('/city', middleware.profile, middleware.existCity, locations.putCity);

router.delete('/region/:ID', middleware.profile, locations.delRegion);
router.delete('/country/:ID', middleware.profile, locations.delCountry);
router.delete('/city/:ID', middleware.profile, locations.delCity); 

module.exports = router;
const router = require('express').Router();
const Companies = require('./controller');
const MiddlewareCompanies = require('./middleware.js');

const companies = new Companies;
const middleware = new MiddlewareCompanies;

router.get('/companies', middleware.profile, companies.getCompanies);
router.post('/company', middleware.profile, companies.addCompany);
router.put('/company', middleware.profile, companies.editCompany);
router.delete('/company/:ID', middleware.profile, companies.delCompany);

module.exports = router;
const router = require('express').Router();
const { propfind } = require('../users');
const Companies = require('./controller');
const MiddlewareCompanies = require('./middleware.js');

const companies = new Companies;
const middleware = new MiddlewareCompanies;

router.post('/company', middleware.profile, companies.addCompany);
router.put('/company', middleware.profile, middleware.exist, companies.editCompany);
router.delete('/company/:ID', middleware.profile, companies.delCompany);

module.exports = router;
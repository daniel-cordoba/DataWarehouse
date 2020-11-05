const router = require('express').Router();
const Companies = require('./controller');
const MiddlewareCompanies = require('./middleware.js');

const companies = new Companies;
const middleware = new MiddlewareCompanies;

router.post('/company', companies.addCompany);
router.put('/company', companies.editCompany);
router.delete('/company/:ID', companies.delCompany);

module.exports = router;
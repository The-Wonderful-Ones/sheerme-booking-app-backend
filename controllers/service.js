const express = require('express');

// case-insensitive + non-strict routing
const router = express.Router();



// Middleware to apply to a specific route (as 2nd parameter)
const mdlwarefunc = (req, res, next) => {

};

// Middleware to apply to all routes
router.use((req, res, next) => {

});




/*--------------------------------------------------------------------------
   Prefix of all routes is defined in index.js = /api/:company_id/service
------------------------------------------------------------------------- */



// GET ALL SERVICES (/api/:company_id/service)
router.get('/', (req, res, next) => {

});

// GET ALL STAFF MEMBERS PROVIDING A SPECIFIC SERVICE (/api/:company_id/service/:service_id/staff)
router.get('/:service_id/staff', (req, res, next) => {
    
});

// ----------------

// POST a service (/api/:company_id/service)
router.post('/', (req, res, next) => {
    
});

// ----------------

// PUT service (/api/:company_id/service/:service_id)
router.put('/:service_id', (req, res, next) => {

});

// ----------------

// DELETE service (/api/:company_id/service/:service_id)
router.delete('/:service_id', (req, res, next) => {

});

// ----------------









module.exports = router;
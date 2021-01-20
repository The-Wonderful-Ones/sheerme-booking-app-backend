const express = require('express');

// case-insensitive + non-strict routing
const router = express.Router();



// Middleware to apply to a specific route (as 2nd parameter)
const mdlwarefunc = (req, res, next) => {

};

// Middleware to apply to all routes
router.use((req, res, next) => {

});



/*-----------------------------------------------------------------------
  Prefix of all routes is defined in index.js = /api/:company_id/client
---------------------------------------------------------------------- */



// GET ALL CLIENTS (/api/:company_id/client)
router.get('/', (req, res, next) => {

});

// ----------------

// POST a client (/api/:company_id/client)
router.post('/', (req, res, next) => {

});

// ----------------

// PUT client (/api/:company_id/client/:client_id)
router.put('/:client_id', (req, res, next) => {

});

// ----------------

// DELETE client (/api/:company_id/client/:client_id)
router.delete('/:client_id', (req, res, next) => {

});

// ----------------






module.exports = router;
const express = require('express');

// case-insensitive + non-strict routing
const router = express.Router();

// Before being processed, any uploaded file will be placed in the tmp/ folder that will be automatically 
// created by Multer.
const upload = require('multer')({ dest:'tmp' });



// Middleware to apply to a specific route (as 2nd parameter)
const mdlwarefunc = (req, res, next) => {

};

// Middleware to apply to all routes
router.use((req, res, next) => {

});




/*-----------------------------------------------------------------------
     Prefix of all routes is defined in index.js = /api/:company_id
---------------------------------------------------------------------- */


// PUT company (/api/:company_id)
router.put('/', (req, res, next) => {

});

// ----------------

// DELETE company (/api/:company_id)
router.delete('/', (req, res, next) => {

});

// ----------------







module.exports = router;
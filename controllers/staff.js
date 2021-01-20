const express = require('express');

// case-insensitive + non-strict routing
const router = express.Router();

// Before being processed, any uploaded file will be placed in the tmp/ folder that will be automatically 
// created by Multer.
const upload = require('multer')({ dest:'tmp' });
  
// see GET - all available starting time for a specific staff member to provide a specific service 
// on a specific date (having into account existing bookings)
const freeHours = require('./functions_staff');



// Middleware to apply to a specific route (as 2nd parameter)
const mdlwarefunc = (req, res, next) => {

};

// Middleware to apply to all routes
router.use((req, res, next) => {

});




/*--------------------------------------------------------------------------
    Prefix of all routes is defined in index.js = /api/:company_id/staff
------------------------------------------------------------------------- */



// GET ALL STAFF MEMBERS (/api/:company_id/staff)
router.get('/', (req, res, next) => {
    
});

// GET all available start time for a specific staff member to provide a specific service 
// on a specific date (having into account existing bookings)
// (/api/:company_id/staff/:staff_id/service/:service_id/date/:date/available-time)
router.get('/:staff_id/service/:service_id/date/:date/available-time', (req, res, next) => {
    
    // responds with an array of available time (strings) from 8:00 to 18:45 (15' time slots)
    res.status().send(freeHours(startTimes_mod,endTimes));
    
});

// ----------------

// POST a staff member (/api/:company_id/staff)
router.post('/', (req, res, next) => {

});

// POST specific service provided by specific staff member (/api/:company_id/staff/:staff_id/service)
router.post('/:staff_id/service', (req, res, next) => {

});

// ----------------

// PUT staff member (/api/:company_id/staff/:staff_id)
router.put('/:staff_id', (req, res, next) => {

});

// ----------------

// DELETE staff member (/api/:company_id/staff/:staff_id)
router.delete('/:staff_id', (req, res, next) => {

});

// DELETE specific service provided by specific staff member 
// (/api/:company_id/staff/:staff_id/service/:service_id)
router.delete('/:staff_id/service/:service_id', (req, res, next) => {

});

// ----------------




module.exports = router;

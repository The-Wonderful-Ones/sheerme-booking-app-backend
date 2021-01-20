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
  Prefix of all routes is defined in index.js = /api/:company_id/booking
---------------------------------------------------------------------- */




// GET ALL BOOKINGS (/api/:company_id/booking)
router.get('/', (req, res, next) => {

});

// GET ALL BOOKINGS FOR A SPECIFIC DATE (/api/:company_id/booking/:date)
router.get('/:date', (req, res, next) => {

});

// ----------------

// POST a booking (/api/:company_id/booking)
router.post('/', (req, res, next) => {

});

// ----------------

// PUT booking (/api/:company_id/booking/:booking_id)
router.put('/:booking_id', (req, res, next) => {

});

// ----------------

// DELETE booking (/api/:company_id/booking/:booking_id)
router.delete('/:booking_id', (req, res, next) => {

});

// ----------------








module.exports = router;
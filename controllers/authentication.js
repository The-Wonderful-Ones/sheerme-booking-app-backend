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


/*----------------------------------------------------------
  Prefix of all routes is defined in index.js = /api/auth
---------------------------------------------------------- */



// POST sign in form (/api/auth/signin)
router.post('/signin', (req, res, next) => {

});


// POST sign in form (/api/auth/signin/resetpass)
router.post('/signin/resetpass', (req, res, next) => {

});


// POST sign up form (/api/auth/signup)
router.post('/signup', (req, res, next) => {

});

// ----------------





module.exports = router;
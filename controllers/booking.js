const express = require("express");
const router = express.Router();

/*-----------------------------------------------------------------------
  Prefix of all routes is defined in index.js = /api/:company_id/booking
---------------------------------------------------------------------- */

// GET ALL BOOKINGS (/api/:company_id/booking)
router.get("/", (req, res, next) => {});

// GET ALL BOOKINGS FOR A SPECIFIC DATE (/api/:company_id/booking/:date)
router.get("/:date", (req, res, next) => {});

// POST a booking (/api/:company_id/booking)
router.post("/", (req, res, next) => {});

// PUT booking (/api/:company_id/booking/:booking_id)
router.put("/:booking_id", (req, res, next) => {});

// DELETE booking (/api/:company_id/booking/:booking_id)
router.delete("/:booking_id", (req, res, next) => {});

module.exports = router;

const express = require("express");

// case-insensitive + non-strict routing
const router = express.Router();

// importing controllers and defining a prefix for each
router.use("/api/auth", require("./authentication"));
router.use("/api/:company_id", require("./company"));
router.use("/api/:company_id/booking", require("./booking"));
router.use("/api/:company_id/client", require("./client"));
router.use("/api/:company_id/service", require("./service"));
router.use("/api/:company_id/staff", require("./staff"));

module.exports = router;

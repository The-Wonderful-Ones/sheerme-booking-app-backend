const express = require("express");
const router = express.Router();
const passport = require("passport");

// middleware to pass on the company_id in the req.params
const passCompanyId = function (req, res, next) {
  (req.company_id = req.params.company_id), next();
};

// importing controllers and defining a prefix for each
router.use("/api/auth", require("./authentication"));
router.use(
  "/api/company/:company_id/staff",
  passport.authenticate("jwt", { session: false }),
  passCompanyId,
  require("./staff")
);
router.use("/api/company/:company_id/booking", require("./booking"));
router.use("/api/company/:company_id/client", require("./client"));
router.use("/api/company/:company_id/service", require("./service"));
router.use("/api/company/:company_id", require("./company"));

module.exports = router;
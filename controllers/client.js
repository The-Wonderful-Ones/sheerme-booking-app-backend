const express = require("express");
const router = express.Router();

/*-----------------------------------------------------------------------
  Prefix of all routes is defined in index.js = /api/:company_id/client
---------------------------------------------------------------------- */

// GET ALL CLIENTS (/api/:company_id/client)
router.get("/", (req, res, next) => {});

// POST a client (/api/:company_id/client)
router.post("/", (req, res, next) => {});

// PUT client (/api/:company_id/client/:client_id)
router.put("/:client_id", (req, res, next) => {});

// DELETE client (/api/:company_id/client/:client_id)
router.delete("/:client_id", (req, res, next) => {});

module.exports = router;

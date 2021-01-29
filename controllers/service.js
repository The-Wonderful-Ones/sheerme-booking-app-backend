const express = require("express");
const router = express.Router();
const connection = require("../config.js");

/*--------------------------------------------------------------------------
   Prefix of all routes is defined in index.js = /api/:company_id/service
------------------------------------------------------------------------- */

// GET ALL SERVICES (/api/:company_id/service)
router.get("/", (req, res) => {
  const company_id = req.company_id;
  connection.query(
    "SELECT * FROM service WHERE company_id = ?",
    [company_id],
    (err, results) => {
      if (err) res.status(500).send(err);
      if (!results.length) {
        res.status(404).send({ message: "There were no services found" });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

// POST a service (/api/:company_id/service)
// companyId is sent within the body of this request and not needed via the req.params
router.post("/", (req, res, next) => {
  const formData = req.body;
  connection.query(
    "INSERT INTO service SET ?",
    [formData],
    (error, results) => {
      if (error) res.status(500).send(error);
      const service_id = results.insertId;
      connection.query(
        "SELECT * FROM service WHERE id = ?",
        [service_id],
        (err, results) => {
          if (err) res.status(500).send(err);
          res.status(200).json(results);
        }
      );
    }
  );
});

// PUT service (/api/:company_id/service/:service_id)
router.put("/:service_id", (req, res, next) => {
  const { service_id } = req.params;
  const formData = req.body;
  connection.query(
    "UPDATE service SET ? WHERE id = ?",
    [formData, service_id],
    (error, results) => {
      if (error) res.status(500).send(error);
      connection.query(
        "SELECT * FROM service WHERE id = ?",
        [service_id],
        (err, results) => {
          if (err) res.status(500).send(err);
          res.status(200).json(results);
        }
      );
    }
  );
});

// DELETE service (/api/:company_id/service/:service_id)
router.delete("/:service_id", (req, res, next) => {
  const { service_id } = req.params;
  connection.query(
    "DELETE FROM service WHERE id = ?",
    [service_id],
    (error, results) => {
      if (error) res.status(500).send(error);
      res
        .status(200)
        .send({ message: "Service has been deleted successfully" });
    }
  );
});

module.exports = router;

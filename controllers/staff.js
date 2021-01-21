const express = require("express");
const router = express.Router();
const connection = require("../config.js");

/*--------------------------------------------------------------------------
    Prefix of all routes is defined in index.js = /api/:company_id/staff
------------------------------------------------------------------------- */

// GET ALL STAFF MEMBERS (/api/company/:company_id/staff)
router.get("/", (req, res) => {
  const company_id = req.company_id;
  connection.query(
    "SELECT id, username, firstname, lastname, headshot_path, email_address FROM staff WHERE company_id = ?",
    [company_id],
    (err, results) => {
      if (err) res.status(500).send(err);
      if (!results.length) {
        res.status(404).send({ message: "There were no staff found" });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

// POST a staff member (/api/:company_id/staff)
router.post("/", (req, res, next) => {});

// PUT staff member (/api/:company_id/staff/:staff_id)
router.put("/:staff_id", (req, res, next) => {
  const { staff_id } = req.params;
  const formData = req.body;
  connection.query(
    "UPDATE staff SET ? WHERE id = ?",
    [formData, staff_id],
    (error, results) => {
      if (error) res.status(500).send(error);
      connection.query(
        "SELECT id, username, firstname, lastname, headshot_path, email_address FROM staff WHERE id = ?",
        [staff_id],
        (err, results) => {
          if (err) res.status(500).send(err);
          res.status(200).json(results);
        }
      );
    }
  );
});

// DELETE staff member (/api/:company_id/staff/:staff_id)
router.delete("/:staff_id", (req, res, next) => {
  const { staff_id } = req.params;
  connection.query(
    "DELETE FROM staff WHERE id = ?",
    [staff_id],
    (error, results) => {
      if (error) res.status(500).send(error);
      res
        .status(200)
        .send({ message: "Staff member has been deleted successfully" });
    }
  );
});

// GET all available start time for a specific staff member to provide a specific service
// on a specific date (having into account existing bookings)
// (/api/:company_id/staff/:staff_id/service/:service_id/date/:date/available-time)
router.get(
  "/:staff_id/service/:service_id/date/:date/available-time",
  (req, res, next) => {
    // responds with an array of available time (strings) from 8:00 to 18:45 (15' time slots)
    res.status().send(freeHours(startTimes_mod, endTimes));
  }
);

// POST specific service provided by specific staff member (/api/:company_id/staff/:staff_id/service)
router.post("/:staff_id/service", (req, res, next) => {});

// DELETE specific service provided by specific staff member
// (/api/:company_id/staff/:staff_id/service/:service_id)
router.delete("/:staff_id/service/:service_id", (req, res, next) => {});

module.exports = router;

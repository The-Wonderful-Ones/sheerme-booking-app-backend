const express = require("express");
const router = express.Router();
const { bookingsFormatter } = require("../utils/bookings-formatter");
const connection = require("../config.js");

/*-----------------------------------------------------------------------
  Prefix of all routes is defined in index.js = /api/:company_id/booking
---------------------------------------------------------------------- */

// GET ALL BOOKINGS FOR A SPECIFIC DATE (/api/:company_id/booking/:date)
router.get("/:date", (req, res, next) => {
  const { date } = req.params;
  const company_id = req.company_id;
  connection.query(
    `SELECT  staff.id as staff_id, staff.headshot_path as staff_headshot_path, client.firstname as client_first_name, client.lastname as client_last_name, client.phone_number as client_phone_number, service.name as service_name, booking.service_date_time, booking_service.id as booking_service_id, service.duration_minutes, booking.id FROM booking JOIN booking_service ON booking_service.booking_id = booking.id JOIN service ON booking_service.service_id = service.id JOIN staff ON booking.staff_id = staff.id JOIN client ON client.id = booking.client_id WHERE staff.company_id = ? AND booking.service_date_time LIKE ?`,
    [company_id, `${date}%`],
    (err, results) => {
      if (err) res.status(500).send(err);
      // map over each service and then calculate the time for this booking
      let bookings = bookingsFormatter(results);

      res.status(200).send(bookings);
    }
  );
});

// POST a booking (/api/:company_id/booking)
router.post("/", (req, res, next) => {
  const { services, ...formData } = req.body;

  connection.query("INSERT INTO booking SET ?", [formData], (err, results) => {
    if (err) res.status(500).send(err);
    const bookingId = results.insertId;

    services.map((serviceId) => {
      connection.query(
        "INSERT INTO booking_service (booking_id, service_id) VALUES(?, ?)",
        [bookingId, serviceId],
        (err, results) => {
          if (err) res.status(500).send(err);
        }
      );
    });
    connection.query(
      `SELECT  staff.headshot_path as staff_headshot_path, client.firstname as client_first_name, client.lastname as client_last_name, client.phone_number as client_phone_number, service.name as service_name, booking.service_date_time, booking_service.id as booking_service_id, service.duration_minutes, booking.id FROM booking JOIN booking_service ON booking_service.booking_id = booking.id JOIN service ON booking_service.service_id = service.id JOIN staff ON booking.staff_id = staff.id JOIN client ON client.id = booking.client_id WHERE booking.id = ?`,
      [bookingId],
      (err, results) => {
        if (err) res.status(500).send(err);
        const bookings = bookingsFormatter(results);
        res.status(200).send(bookings);
      }
    );
  });
});

// PUT booking (/api/:company_id/booking/:booking_id)
router.put("/:booking_id", (req, res, next) => {
  const { booking_id } = req.params;
  const formData = req.body;
  connection.query(
    "UPDATE booking SET ? WHERE id = ?",
    [formData, booking_id],
    (err, results) => {
      if (err) res.status(500).send(err);

      connection.query(
        `SELECT  staff.headshot_path as staff_headshot_path, client.firstname as client_first_name, client.lastname as client_last_name, client.phone_number as client_phone_number, service.name as service_name, booking.service_date_time, booking_service.id as booking_service_id, service.duration_minutes, booking.id FROM booking JOIN booking_service ON booking_service.booking_id = booking.id JOIN service ON booking_service.service_id = service.id JOIN staff ON booking.staff_id = staff.id JOIN client ON client.id = booking.client_id WHERE booking.id = ?`,
        [booking_id],
        (err, results) => {
          if (err) res.status(500).send(err);
          const bookings = bookingsFormatter(results);
          res.status(200).send(bookings);
        }
      );
    }
  );
});

// DELETE booking (/api/:company_id/booking/:booking_id)
router.delete("/:booking_id", (req, res, next) => {
  const { booking_id } = req.params;
  connection.query(
    "DELETE FROM booking where id = ?",
    [booking_id],
    (err, results) => {
      if (err) res.status.send(err);
      res.status(200).send({
        message: "booking has been deleted successfully",
      });
    }
  );
});

// DELETE service from booking (/api/:company_id/booking/:booking_id/booking_service/:booking_service_id)
router.delete(
  "/:booking_id/booking_service/:booking_service_id",
  (req, res, next) => {
    const { booking_service_id } = req.params;
    connection.query(
      "DELETE FROM booking_service where id = ?",
      [booking_service_id],
      (err, results) => {
        if (err) res.status(500).send(err);
        res.status(200).send({
          message: "service has been deleted from booking successfully",
        });
      }
    );
  }
);

// POST service from booking (/api/:company_id/booking/:booking_id/service/service_id)
router.post("/:booking_id/service/:service_id", (req, res, next) => {
  const { booking_id, service_id } = req.params;
  connection.query(
    "INSERT INTO booking_service (booking_id, service_id) VALUES (?, ?)",
    [booking_id, service_id],
    (err, results) => {
      if (err) res.status(500).send(err);
      const booking_service_id = results.insertId;
      connection.query(
        "select booking_service.id as booking_service_id, service.duration_minutes, service.name as service_name  from service JOIN booking_service ON service.id = booking_service.service_id WHERE booking_service.id = ?",
        [booking_service_id],
        (err, results) => {
          if (err) res.status(500).send(err);
          res.status(200).send(results);
        }
      );
    }
  );
});

module.exports = router;

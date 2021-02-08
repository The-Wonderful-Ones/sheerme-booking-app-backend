const express = require("express");
const router = express.Router();
const connection = require("../config.js");

/*-----------------------------------------------------------------------
  Prefix of all routes is defined in index.js = /api/:company_id/booking
---------------------------------------------------------------------- */

// GET ALL BOOKINGS FOR A SPECIFIC DATE (/api/:company_id/booking/:date)
router.get("/:date", (req, res, next) => {
  const { date } = req.params;
  const company_id = req.company_id;
  connection.query(
    `SELECT  staff.headshot_path as staff_headshot_path, client.firstname as client_first_name, client.lastname as client_last_name, client.phone_number as client_phone_number, service.name as service_name, booking.service_date_time, booking_service.id as booking_service_id, service.duration_minutes, booking.id FROM booking JOIN booking_service ON booking_service.booking_id = booking.id JOIN service ON booking_service.service_id = service.id JOIN staff ON booking.staff_id = staff.id JOIN client ON client.id = booking.client_id WHERE staff.company_id = ? AND booking.service_date_time LIKE ?`,
    [company_id, `${date}%`],
    (err, results) => {
      if (err) res.status(500).send(err);
      // map over each service and then calculate the time for this booking
      let bookings = results;
      let bookingsReformatted = [];

      for (let i = 0; i < bookings.length; i++) {
        // destructuring properties out of the bookings[i] which are a part of the service
        // the rest is spread to the variable booking
        const {
          booking_service_id,
          duration_minutes,
          service_name,
          ...booking
        } = bookings[i];
        // check if booking doesn't exist in bookingsReformatted and then push it there
        if (
          !bookingsReformatted.some((element) => element.id === bookings[i].id)
        ) {
          // push the booking to the bookingsReformatted array and setup the services array
          bookingsReformatted.push({
            ...booking,
            servicesTotalDuration: duration_minutes,
            services: [
              {
                booking_service_id,
                service_name,
              },
            ],
          });
        } else {
          // the booking already exists within the array so we add the extra service for that booking
          bookingsReformatted = bookingsReformatted.map((element) =>
            // here we find the booking which needs the extra service added to its services array
            element.id === bookings[i].id
              ? {
                  ...element,
                  servicesTotalDuration:
                    element.servicesTotalDuration + duration_minutes,
                  services: [
                    ...element.services,
                    {
                      booking_service_id,
                      service_name,
                    },
                  ],
                }
              : element
          );
        }
      }
      // send the array of bookings with the array of services attached to each booking
      res.status(200).send(bookingsReformatted);
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
  });
});

// PUT booking (/api/:company_id/booking/:booking_id)
router.put("/:booking_id", (req, res, next) => {});

// DELETE booking (/api/:company_id/booking/:booking_id)
router.delete("/:booking_id", (req, res, next) => {});

module.exports = router;

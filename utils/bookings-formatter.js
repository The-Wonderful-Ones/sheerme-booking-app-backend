const bookingsFormatter = (bookings) => {
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
    if (!bookingsReformatted.some((element) => element.id === bookings[i].id)) {
      // push the booking to the bookingsReformatted array and setup the services array
      bookingsReformatted.push({
        ...booking,
        servicesTotalDuration: duration_minutes,
        services: [
          {
            booking_service_id,
            service_name,
            duration_minutes,
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
                  duration_minutes,
                },
              ],
            }
          : element
      );
    }
  }
  // send the array of bookings with the array of services attached to each booking
  return bookingsReformatted;
};

module.exports = { bookingsFormatter };

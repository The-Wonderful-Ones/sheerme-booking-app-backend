// Returns all possible hours for booking any service (array of strings 'hh:mm'), as if
// there werent any bookings yet.
const allHours = (startHour, endHour, timeSlot) => {

// returned hours must be within company opening hours (from startHour to endHour)
// There wont be any hour that equals comapny closing hour.
// timeSlot (min) = interval between consecutive hours - must be such that 
//  60 % timeSlot = 0 (% = the remainder)
  
    let timeArray = [];
  
    for (let i = 0; i < (endHour - startHour); i++) {
      for (let j = 0; j < 60/timeSlot; j++) {
        timeArray.push(`${startHour + i}:${j*timeSlot < 10 ? '0'+j*timeSlot : j*timeSlot}`);
      }
    }
    return timeArray; 
};
  



// Returns the available starting hours for a specific staff member to 
// provide a specific service* on a specific date (having into account existing bookings)
const freeHours = (startTimes_mod, endTimes) => {
  
    // bookedTimes - array of strings ('hh:mm:ss') of all the booked hours for some staff member in a specific date  
    //               (computed in MySQL to obtain the function arguments below)

// startTimes_mod  - bookedTimes "-" service_duration*   (computed in MySQL)
// endTimes        - bookedTimes "+" service_duration**  (computed in MySQL)

// * duration of the service to be booked 
// ** duration of each booked service


    let timeArray = allHours(8,19,15);
  
    for (let i = 0 ; i < startTimes_mod.length ; i++) {
      const hour_min_start = startTimes_mod[i].split(':');
      const hour_min_end = endTimes[i].split(':');
      const newDate = new Date();
      const startTime = newDate.setHours(hour_min_start[0],hour_min_start[1]);
      const endTime = newDate.setHours(hour_min_end[0],hour_min_end[1]);
  
      timeArray = timeArray.filter(el => {
        const timeInst = el.split(':');
        const cond_1 = newDate.setHours(timeInst[0], timeInst[1]) <= startTime;
        const cond_2 = newDate.setHours(timeInst[0], timeInst[1]) >= endTime;
        return cond_1 || cond_2;
      });
    }
  
    return timeArray;
};




module.exports = freeHours;
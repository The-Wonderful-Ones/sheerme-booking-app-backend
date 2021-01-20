  
  const freeHours = require('./functions_staff');

  const startTimes_mod = ['8:40:00','12:10:00','16:10:00'];
  const endTimes = ['10:30:00','12:45:00','18:30:00'];
  
  console.log(freeHours(startTimes_mod,endTimes));
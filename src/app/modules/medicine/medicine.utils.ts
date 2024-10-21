
// import cron from 'node-cron';
// import { TMedicine } from './medicine.interface';
// import { io } from '../../../server';

// export const scheduleMedicineAlarms = (medicine: TMedicine) => {
//   const { time, days, name, userId } = medicine;
//   const [hour, minute] = time.split(':').map(Number);

//   // Schedule the task for each day
//   days.forEach((day) => {
//     const dayOfWeek = getCronDay(day);

//     // Cron job: 'minute hour day-of-month month day-of-week'
//     const cronTime = `${minute} ${hour} * * ${dayOfWeek}`;

//     cron.schedule(cronTime, () => {
//       console.log(`Scheduled alarm for ${name} at ${time} on ${day}`);
//       // Emit alarm event to the frontend through Socket.IO
//       io.to(userId.toString()).emit('medicine-alarm', {
//         message: `It's time to take your medicine: ${name}`,
//         time,
//         day,
//       });
//     });
//   });
// };

// // Convert day name to cron day-of-week (0 = Sunday, 6 = Saturday)
// export const getCronDay = (day: string): number => {
//   const daysOfWeek: { [key: string]: number } = {
//     sunday: 0,
//     monday: 1,
//     tuesday: 2,
//     wednesday: 3,
//     thursday: 4,
//     friday: 5,
//     saturday: 6,
//   };
//   return daysOfWeek[day.toLowerCase()];
// };




// ------------

// using setInterval

import { TMedicine, TDays } from './medicine.interface'; // Import TDays for type safety
import { io } from '../../../server';

// Function to get the day name based on the numeric day (0-6)
export const getDayName = (day: number): TDays => {
  const daysOfWeek: TDays[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return daysOfWeek[day]; // Type safety ensured with TDays
};

// Schedule alarms for medicines
export const scheduleMedicineAlarms = (medicine: TMedicine) => {
  const { time, days, name, userId } = medicine;
  const [hour, minute] = time.split(':').map(Number);

  // Function to check if today is a scheduled day and if the time matches
  const checkMedicineAlarm = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Check if today is a scheduled day
    if (days.includes(getDayName(currentDay))) {
      // Check if the current time matches the alarm time
      if (currentHour === hour && currentMinute === minute) {
        console.log(`Scheduled alarm for ${name} at ${time} on ${getDayName(currentDay)}`);
        // Emit alarm event to the frontend through Socket.IO
        io.to(userId.toString()).emit('medicine-alarm', {
          message: `It's time to take your medicine: ${name}`,
          time,
          day: getDayName(currentDay),
        });
      }
    }

    // Schedule the next check after 1 minute
    setTimeout(checkMedicineAlarm, 60000); // 60000 milliseconds = 1 minute
  };

  // Start the first check
  checkMedicineAlarm();
};
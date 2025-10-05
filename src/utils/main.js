import { absentChecker, holidayChecker, sundayChecker, getMaxDaysInMonth, attendencePerform } from './utils.js';
function attendenceCalculator(holidays, leaves, n, periods_present, total_periods_held, current_date, sundays, periods_per_day) {
    const arr = [];
    let attendence = 0;
    let now = new Date();
    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();
    let maxDaysInMonth = getMaxDaysInMonth(currentMonth, currentYear);
    for (let i = current_date; i < current_date + n; i++) {
        let currentDay = i;
        let currentMonthUpdated = currentMonth;
        if (currentDay > maxDaysInMonth) {
            currentDay = currentDay - maxDaysInMonth; 
            maxDaysInMonth = getMaxDaysInMonth(currentMonthUpdated, currentYear);
        }
        if (absentChecker(leaves, currentDay)) {
            total_periods_held += periods_per_day;
            attendence = attendencePerform(periods_present, total_periods_held);
            arr.push({ day: currentDay, attendence: attendence, absent: true });
        }
        else if (holidayChecker(holidays, currentDay)) continue;
        else if (sundayChecker(sundays, currentDay)) continue;
        else {
            periods_present += periods_per_day;
            total_periods_held += periods_per_day;
            attendence = attendencePerform(periods_present, total_periods_held);
            arr.push({ day: currentDay, attendence: attendence, absent: false})
        }
    }
    return arr;
}

export default attendenceCalculator;
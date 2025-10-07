function getAttendanceCounts(data) {
  const summary = data.attendance_summary;
  const today = new Date().toLocaleDateString();
  const lastDate = localStorage.getItem("lastDate");
  if (lastDate != today) {
    localStorage.setItem("lastDate", today);
    return {
      totalPresent: 0,
      totalAbsent: 0,
      totalClasses: 0
    };
  }
  // ✅ If attendance not posted
  if (
    summary.length === 1 &&
    summary[0].message &&
    typeof summary[0].message === "string"
  ) {
    return {
      totalPresent: 0,
      totalAbsent: 0,
      totalClasses: 0,
      message: summary[0].message
    };
  }

  // ✅ Otherwise, calculate counts normally
  let totalPresent = 0;
  let totalAbsent = 0;

  summary.forEach(item => {
    const record = item.attendance_today?.toUpperCase() || "";
    for (let char of record) {
      if (char === 'P') totalPresent++;
      if (char === 'A') totalAbsent++;
    }
  });

  const totalClasses = totalPresent + totalAbsent;

  return {
    totalClasses
  };
}
export default getAttendanceCounts;
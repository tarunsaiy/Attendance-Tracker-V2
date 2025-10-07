function attendanceTarget(x, y) {
  const currentPercentage = (x / y) * 100;

  // 75% of total
  const seventyFiveValue = 0.75 * y;

  // If below 75% → how much more needed
  if (currentPercentage < 75) {
    const neededToReach = Math.ceil(seventyFiveValue - x);
    return {
      currentPercentage: currentPercentage.toFixed(2) + "%",
      neededToReach,
      canDecrease: 0
    };
  }

  // If above 75% → how much you can reduce and still stay at 75%
  if (currentPercentage > 75) {
    const canDecrease = Math.floor(x - seventyFiveValue);
    return {
      currentPercentage: currentPercentage.toFixed(2) + "%",
      neededToReach: 0,
      canDecrease
    };
  }

  // If exactly 75%
  return {
    currentPercentage: "75.00%",
    neededToReach: 0,
    canDecrease: 0
  };
}
export default attendanceTarget;
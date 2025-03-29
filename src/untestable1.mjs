const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas(today = new Date()) {
  const year = today.getFullYear(); //hard coded
  const christmasDay = new Date(year, 11, 25); //december 25th but
 //const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today > christmasDay) {
    christmasDay.setFullYear(year + 1);
  }
  const diff = christmasDay - today;
  return Math.floor(diff / millisPerDay);
}

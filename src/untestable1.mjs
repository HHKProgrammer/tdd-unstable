const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas(today = new Date()) {
  const year = today.getFullYear(); //hard coded
  const christmasDay = new Date(year, 11, 25); //december 25th but
 //const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  //  both dates to midnight (00:00:00) for  comparison
  today.setHours(0, 0, 0, 0);
  christmasDay.setHours(0, 0, 0, 0);
  if (today > christmasDay) {
    christmasDay.setFullYear(year + 1);
  }
  const diff = christmasDay - today;
  return Math.ceil(diff / millisPerDay);//math floor is wrong here
}

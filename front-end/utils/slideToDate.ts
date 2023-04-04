export function slideToDate(value: string): string {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + Number(value));
  currentDate.setMinutes(0);
  let returnDate = currentDate.toLocaleString("en-GB", { timeZone: "Europe/London" });
  returnDate = returnDate.split(":")[0] + ":" + returnDate.split(":")[1];
  return returnDate;
}
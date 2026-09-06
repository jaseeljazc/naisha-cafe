export { cn } from "cn";

export function formatPrice(price) {
  return `₹${price}`;
}

export function isOpenNow(hours) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const today = hours?.find((h) => h.day === days[now.getDay()]);
  if (!today || today.closed) return { open: false, until: "tomorrow" };

  const [oh, om] = today.open.split(":").map(Number);
  const [ch, cm] = today.close.split(":").map(Number);
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const format = (h, m) =>
    `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h >= 12 ? "pm" : "am"}`;

  if (nowMins >= oh * 60 + om && nowMins < ch * 60 + cm) {
    return { open: true, until: format(ch, cm) };
  }
  return { open: false, until: format(oh, om) };
}

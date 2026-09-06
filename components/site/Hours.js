import { site } from "@/data/site.js";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatTime(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 || 12;
  return m === 0
    ? `${hour12} ${period}`
    : `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export default function Hours() {
  const todayIndex = new Date().getDay();
  const currentDayName = DAYS[todayIndex];

  return (
    <section id="hours" className="py-20 md:py-28 max-w-6xl mx-auto px-6 md:px-10">
      <div className="max-w-2xl">
        <h2 className="font-display text-section text-ink mb-12 md:mb-16">
          Opening hours
        </h2>

        <div className="flex flex-col border-t border-line">
          {site.hours.map((row) => {
            const isToday = row.day === currentDayName;

            return (
              <div
                key={row.day}
                className={`py-4 flex items-center justify-between border-b border-line ${
                  isToday
                    ? "border-l-2 border-l-leaf pl-4 text-ink font-medium"
                    : "text-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isToday ? "text-ink" : "text-ink/90"}>
                    {row.day}
                  </span>
                  {isToday && (
                    <span className="text-xs text-leaf font-medium">
                      (Today)
                    </span>
                  )}
                </div>

                <span className="tabular-nums">
                  {row.closed
                    ? "Closed"
                    : `${formatTime(row.open)} – ${formatTime(row.close)}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

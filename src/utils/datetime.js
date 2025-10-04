import * as  chrono from "chrono-node";
import { DateTime } from "luxon";

export function extractDateTime(text) {
  const results = chrono.parse(text);

  if (results.length === 0) {
    return { date: null, time: null };
  }

  const parsedDate = results[0].start.date();
  const dt = DateTime.fromJSDate(parsedDate).setZone("Asia/Kolkata");

  return {
    date: dt.toISODate(),
    time: dt.toFormat("HH:mm"),
    tz: "Asia/Kolkata",
  };
}

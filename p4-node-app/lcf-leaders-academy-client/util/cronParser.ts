import parser from "cron-parser";

export function translateCronExpression(expression: string): string | null {
  try {
    const interval = parser.parseExpression(expression);
    const nextDate = interval.next().toDate();

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(nextDate);
  } catch (err) {
    return null;
  }
}

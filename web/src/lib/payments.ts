/**
 * Format a number as a currency amount.
 *
 * @param amount The number to be formatted as a currency amount
 * @param locale The locale to use for formatting. Default is 'en-KE'.
 * @param currency The ISO 4217 currency code to use for formatting. Default is 'KES'.
 * @returns The formatted currency amount.
 */
export function formatAmount(amount: number, locale = 'en-KE', currency = 'KES') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

/**
 * Format a date in the format 'Weekday, Month Day, Year' according to the locale.
 *
 * @param date The date to be formatted
 * @param locale The locale to use for formatting. Default is 'en-KE'.
 * @returns The formatted date
 */
export function formatDate(date: Date, locale = 'en-KE') {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Given a full date, returns the date in the format 'YYYY-MM-DD' required by the
 * add payment endpoint.
 *
 * @param fullDate The full date to be formatted
 * @returns The formatted date
 */
export function getAddPaymentDateFormat(fullDate: Date) {
  const [date] = fullDate.toISOString().split('T');

  return date;
}

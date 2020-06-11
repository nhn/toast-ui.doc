/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Example for using external
 */

/**
 * The built in date object
 * @external Date
 * @see {@link https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date|Date}
 */

/**
 * Returns the numeric value corresponding to the current time - the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC, with leap seconds ignored.
 * @function external:Date#now
 * @static
 * @example
 * const date = Date.now();
 *
 * console.log(date); // 1566379209918
 */

/**
 * Returns the day of the month (1-31) for the specified date according to local time.
 * @function external:Date#getDate
 * @example
 * const birthday = new Date('August 19, 1975 23:15:30');
 * const date = birthday.getDate();
 *
 * console.log(date); // 19
 */

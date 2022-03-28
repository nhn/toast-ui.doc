/**
  * @fileoverview Example for using typedef
 */

/**
 * {@link https://github.com/nhn/tui.code-snippet/blob/master/src/js/customEvent.js|CustomEvents} document at {@link https://github.com/nhnent/tui.code-snippet|tui-code-snippet}
 * @typedef {class} CustomEvents
 */

/**
 * @typedef {object} Timezone
 * @property {number} [timezoneOffset] - Minutes for your timezone offset. If null, use the browser's timezone. Refer to Date.prototype.getTimezoneOffset()
 * @property {string} [displayLabel] - Display label of your timezone at weekly/daily view (e.g. 'GMT+09:00')
 * @property {string} [tooltip] - Tooltip (e.g. 'Seoul')
 * @example
 * const timezoneName = moment.tz.guess();
 * const cal = new Calendar('#calendar', {
 *   timezones: [
 *     {
 *       timezoneOffset: 540,
 *       displayLabel: 'GMT+09:00',
 *       tooltip: 'Seoul'
 *     },
 *     {
 *       timezoneOffset: -420,
 *       displayLabel: 'GMT-08:00',
 *       tooltip: 'Los Angeles'
 *     }
 *   ]
 * });
 */

/**
 * @typedef {object} TimeCreationGuide - Time creation guide instance to present selected time period
 * @property {HTMLElement} guideElement - Guide element
 * @property {Object.<string, HTMLElement>} guideElements - Map by key. It can be used in monthly view
 * @property {function} clearGuideElement - Hide the creation guide
 * @example
 * calendar.on('beforeCreateSchedule', (event) => {
 *   const guide = event.guide;
 *   // Use guideEl$'s left, top to locate your schedule creation popup
 *   const guideEl$ = guide.guideElement ?
 *     guide.guideElement : guide.guideElements[Object.keys(guide.guideElements)[0]];
 *
 *   // After that call this to hide the creation guide
 *   guide.clearGuideElement();
 * });
 */

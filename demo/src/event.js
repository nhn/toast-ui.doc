/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Example for using event
 */

/**
 * Occurs when active state is changed.
 * @event Album#active
 * @type {object} ev - Event data
 * @property {string} title - Title of album
 * @property {boolean} active - Active state of album
 * @example
 * const instance = new Album({
 *   // ...
 *   title: 'foo'
 * });
 * 
 * instance.setActive(false);
 * 
 * instance.on('active', (ev) => {
 *   const { title, active } = ev;
 * 
 *   console.log(title); // "foo"
 *   console.log(active); // false
 * });
 */

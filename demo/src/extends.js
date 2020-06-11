/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Example for extending class
 */

import Album from './class';

/**
 * @class ChartAlbum
 * @extends Album
 * @param {object} options
 *   @param {string} options.title - Title of album
 *   @param {Array.<string>} [options.genres] - Genre list of album
 *   @param {number} [options.playTime=0] - Play time of all songs (unit is seconds)
 *   @param {boolean} [options.active=true] - Whether album is active or not
 *   @param {object} options.artist
 *     @param {string} options.artist.name - Name of artist
 *     @param {string} [options.artist.type] - Type of artist
 *     @param {string} [options.artist.debut] - Debut daofte of artist
 *   @param {object} [options.company] - Company of album
 *     @param {string} [options.company.agency] - Agency name of album
 *     @param {string} [options.company.distributor] - Distributor name of album
 *   @param {number} [options.rank=999] - Rank of album
 * @example
 * const options = {
 *   title: '÷',
 *   genres: ['Rock', 'Pop'],
 *   playTime: 3600,
 *   active: true,
 *   artist: {
 *     name: 'Ed Sheeran',
 *     type: 'Solo',
 *     debut: '2005'
 *   },
 *   company: {
 *     agency: 'Atlantic Records UK',
 *     distributor: 'Warner Music Korea'
 *   },
 *   rank: 1
 * };
 * const instance = new ChartAlbum(options);
 *
 * console.log(instance);
 */
class ChartAlbum extends Album {
  constructor(options) {
    super(options);

    /**
     * @type {number}
     * @private
     */
    this.rank = options.rank || 999;
  }

  /**
   * Returns description about chart album.
   * @param {Album} album - Instance of Album class
   * @returns {string} Description
   * @override
   * @example
   * const album1 = new Album({
   *   // ...
   *   title: 'foo',
   *   rank: 10
   * });
   * const album2 = new Album({
   *   // ...
   *   title: 'bar',
   *   rank: 99
   * });
   *
   * Album.getDescription(album1); // "The rank of "foo" album is 10."
   * Album.getDescription(album2); // "The rank of "bar" album is 99."
   */
  static getDescription(album) {
    const title = album.getTitle();
    const rank = album.getRank();

    return `The rank of "${title}" album is ${rank}.`;
  }

  /**
   * Returns title of album.
   * @returns {string} Title
   * @override
   */
  getTitle() {
    return this.title;
  }

  /**
   * Returns rank of album.
   * @returns {number} Rank
   */
  getRank() {
    return this.rank;
  }
}

export default ChartAlbum;

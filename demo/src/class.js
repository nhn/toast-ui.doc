/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Example for using class
 */

/**
 * @class Album
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
 *   }
 * };
 * const instance = new Album(options);
 * 
 * console.log(instance);
 */
class Album {
  constructor(options) {
    const {
      title,
      genres = [],
      playTime = 0,
      active = true,
      artist = {},
      company
    } = options;

    /**
     * @type {string}
     * @private
     */
    this.title = title;

    /**
     * @type {Array.<string>}
     * @private
     */
    this.genres = genres;

    /**
     * @type {number}
     * @private
     */
    this.playTime = playTime;

    /**
     * @type {boolean}
     * @private
     */
    this.active = active;

    /**
     * @type {object}
     * @private
     */
    this.artist = artist;

    /**
     * @type {?object}
     * @private
     */
    this.company = company || null;
  }

  /**
   * Returns description about album.
   * @param {Album} album - Instance of Album class
   * @returns {string} Description
   * @example
   * const album1 = new Album({
   *   // ...
   *   title: 'foo',
   *   playTime: 20
   * });
   * const album2 = new Album({
   *   // ...
   *   title: 'bar',
   *   playTime: 60
   * });
   * 
   * Album.getDescription(album1); // "The total play time of "foo" album is 00:00:20."
   * Album.getDescription(album2); // "The total play time of "bar" album is 00:01:00."
   */
  static getDescription(album) {
    const title = album.getTitle();
    const playTime = album.getPlayTime(true);

    return `The total play time of "${title}" album is ${playTime}.`;
  }

  /**
   * Sets active state of album.
   * @param {boolean} active - Whether album is active or not
   */
  setActive(active) {
    this.active = active;
  }

  /**
   * Sets active state of album.
   * @param {boolean} active - Whether album is active or not
   * @deprecated
   */
  setActivate(active) {
    this.active = active;
  }

  /**
   * Returns formatted time (00:00:00).
   * @param {number} seconds - Time to format
   * @returns {string} Formatted time
   * @private
   */
  getFormattedTime(seconds) {
    return new Date(seconds * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
  }

  /**
   * Returns title of album.
   * @returns {string} Title
   */
  getTitle() {
    return this.title;
  }

  /**
   * Returns genres of album.
   * @returns {string} Genres joined with comma
   * @example
   * const instance = new Album({
   *   // ...
   *   genre: ['Pop', 'Jazz']
   * });
   * 
   * instance.getGenres(); // "Pop,Jazz"
   */
  getGenres() {
    return this.genres.join(',');
  }

  /**
   * Returns play time of all songs.
   * @param {boolean} formatted - Whether use formatted play time or not 
   * @returns {number|string} Play time
   * @example
   * const instance = new Album({
   *   // ...
   *   playTime: 3600
   * });
   * 
   * instance.getPlayTime(); // 3600
   * instance.getPlayTime(true); // "01:00:00"
   */
  getPlayTime(formatted) {
    let {playTime} = this;

    if (formatted) {
      return this.getFormattedTime(playTime);
    }

    return playTime;
  }

  /**
   * Returns artist information of album.
   * @returns {object} Artist object
   */
  getArtist() {
    return this.artist;
  }

  /**
   * Returns company information of album.
   * @returns {?{agency: String, distributor: String}} Company object
   */
  getCompany() {
    return this.company;
  }
}

/**
 * Locale code of album
 * @type {object}
 * @property {string} kr - Code for Korean
 * @property {string} en - Code for English
 */
Album.localeCode = {
  kr: '0001',
  en: '0002'
};

export default Album;

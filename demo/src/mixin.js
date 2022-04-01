/**
 * @fileoverview Example for using mixin
 * @link https://jsdoc.app/tags-mixin.html
 */

/**
 * This provides methods used for event handling. It's not meant to be used directly.
 * @mixin
 */
var Eventful = {
  /**
   * Register a handler function to be called whenever this event is fired.
   * @param {string} eventName - Name of the event.
   * @param {function} handler - The handler to call.
   */
  on: function (eventName, handler) {
    // code...
  },

  /**
   * Fire an event, causing all handlers for that event name to run.
   * @param {string} eventName - Name of the event.
   * @param {Object} eventData - The data provided to each handler.
   */
  fire: function (eventName, eventData) {
    // code...
  }
};

/**
 * @class ReleaseAlbum
 * @mixes Eventful
 */
function ReleaseAlbum() {
  // code...
}

/**
 * Open release album and fire custom event.
 */
ReleaseAlbum.prototype.open = function () {
  this.fire('open', {});
};

mix(Eventful).into(ReleaseAlbum.prototype);

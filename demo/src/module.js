/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Example for using module
 */

/**
 * Utility functions
 * @module utils
 * @example
 * import {
 *   isUndefined,
 *   isNull,
 *   isExisty
 * } from './module';
 * 
 * isUndefined();
 * isNull();
 * isExisty();
 */

/**
 * Checks whether the given variable is undefined or not.
 * @param {*} param - Target for checking
 * @returns {boolean} State
 * @memberof module:utils
 * @function
 */
export const isUndefined = (param) => {
  return param === undefined; // eslint-disable-line no-undefined
};

/**
 * Checks whether the given variable is null or not.
 * @param {*} param - Target for checking
 * @returns {boolean} State
 * @memberof module:utils
 * @function
 */
export const isNull = (param) => {
  return param === null;
};

const isExisty = (param) => {
  return !isUndefined(param) && !isNull(param);
};

export {
  /**
   * Checks whether the given variable is existing or not.
   * @param {*} param - Target for checking
   * @returns {boolean} State
   * @memberof module:utils
   * @function
   */
  isExisty
};

/**
 * @fileoverview Example for using namespace
 */

/**
 * Utility functions
 * @namespace toastui.utils
 * @example
 * const {
 *   isUndefined,
 *   isNull,
 *   isExisty
 * } = toastui.utils;
 *
 * isUndefined();
 * isNull();
 * isExisty();
 */

/**
 * Checks whether the given variable is undefined or not.
 * @param {*} param - Target for checking
 * @returns {boolean} State
 * @memberof toastui.utils
 * @function
 */
const isUndefined = (param) => {
  return param === undefined; // eslint-disable-line no-undefined
};

/**
 * Checks whether the given variable is null or not.
 * @param {*} param - Target for checking
 * @returns {boolean} State
 * @memberof toastui.utils
 * @function
 */
const isNull = (param) => {
  return param === null;
};

/**
 * Checks whether the given variable is existing or not.
 * @param {*} param - Target for checking
 * @returns {boolean} State
 * @memberof toastui.utils
 * @function
 */
const isExisty = (param) => {
  return !isUndefined(param) && !isNull(param);
};

export { isUndefined, isNull, isExisty };

/**
 * Determine if two numbers are effectively equivalent using precision.
 *
 * @param {number | string} a
 * @param {number | string} b
 * @param {number} precision
 * @returns {boolean}
 */
export const areEqual = (
  a: number | string,
  b: number | string,
  precision: number = 6
) => {
  return round(a, precision) === round(b, precision);
};

/**
 * Round a number to precision number of significant digits.
 *
 * @param {number | string} value
 * @param {number} precision
 * @returns {number}
 */
export const round = (value: number | string, precision: number = 0) => {
  let base = Math.round(Number(value + 'e' + precision));
  if (isNaN(base)) {
    // For extremely small numbers rounding will fail and return NaN.
    base = 0;
  }
  return Number(base + 'e-' + precision);
};

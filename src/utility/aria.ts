import Utility from '@/utility/index';

export const Aria = {
  /**
   * Get the preferred text value for a passed Element, searching in order of importance:
   * aria-label > aria-labelledby > aria-value-text > textContent > href
   *
   * @see https://www.w3.org/TR/wai-aria-1.2/#aria-label
   * @see https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby
   * @see https://www.w3.org/TR/wai-aria-1.2/#aria-valuetext
   *
   * @param element - Element to parse.
   * @param {number} [maxLength] - Maximum text length to return.
   */
  getElementText: ({
    element,
    maxLength
  }: {
    element: any;
    maxLength?: number;
  }): string => {
    if (!element) {
      return '';
    }

    const values = [];

    const label = element.getAttribute('aria-label');
    if (label) {
      values.push(label);
    }

    const labelledBy = element.getAttribute('aria-labelledby');
    if (labelledBy) {
      if (document.getElementById(labelledBy)) {
        const labelOfLabelledBy = Utility.Aria.getElementText({
          element: document.getElementById(labelledBy),
          maxLength
        });
        if (labelOfLabelledBy) {
          values.push(labelOfLabelledBy);
        }
      }
    }

    const valueText = element.getAttribute('aria-valuetext');
    if (valueText) {
      values.push(valueText);
    }

    const text = element.textContent;
    if (text) {
      values.push(text);
    }

    const href = element.href;
    if (href) {
      values.push(href);
    }

    // Return first element.
    return values.length > 0 ? String(values[0]).substring(0, maxLength) : '';
  }
};

export default Aria;

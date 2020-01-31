import Utility from '@/utility';
import globalStyles from 'styles/global.scss';

enum DOMValueType {
  Attribute = 'attribute',
  Style = 'style',
  Property = 'property'
}

export const Aria = {
  blurNode: ({ node }: { node: any }): void => {
    if (!node) {
      return;
    }
    // Remove focused class.
    Utility.Css.removeClass({
      node,
      name: globalStyles['wcasg-ada-app-focused']
    });
    // Remove tabindex value.
    Utility.removeNodeValue({
      node,
      type: DOMValueType.Attribute,
      name: 'tabindex'
    });
    // Blur, if available
    if (node.blur && typeof node.blur === 'function') {
      node.blur();
    }
  },
  clearAllFocusedNodes: (): any => {
    // Check if any focus exists.
    if (!document.hasFocus()) {
      return;
    }
    // Check browser assignment
    if (!document.activeElement) {
      return;
    }
    // Check by custom style
    const node = document.getElementsByClassName(
      globalStyles['wcasg-ada-app-focused']
    );
    if (node && node.length > 0) {
      return node[0];
    }
    // Check by tabindex
    const tabIndexed = document.querySelectorAll('*[tabindex]');
    if (tabIndexed && tabIndexed.length > 0) {
      return tabIndexed[0];
    }
  },
  findFocusedNode: (): any => {
    // Check if any focus exists.
    if (!document.hasFocus()) {
      return;
    }
    // Check browser assignment
    if (document.activeElement) {
      return document.activeElement;
    }
    // Check by custom style
    const node = document.getElementsByClassName(
      globalStyles['wcasg-ada-app-focused']
    );
    if (node && node.length > 0) {
      return node[0];
    }
    // Check by tabindex
    const tabIndexed = document.querySelectorAll('*[tabindex]');
    if (tabIndexed && tabIndexed.length > 0) {
      return tabIndexed[0];
    }
  },
  focusNode: ({ node }: { node: any }): void => {
    if (!node) {
      return;
    }
    // Add focused class.
    Utility.Css.addClass({
      node,
      name: globalStyles['wcasg-ada-app-focused']
    });
    // Set -1 tabindex value.
    Utility.setNodeValue({
      node,
      type: DOMValueType.Attribute,
      name: 'tabindex',
      value: -1
    });
    // Focus, if available
    if (node.focus && typeof node.focus === 'function') {
      node.focus();
    }
  },
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

    const label = Utility.getNodeValue({
      node: element,
      name: 'aria-label',
      type: DOMValueType.Attribute
    });
    if (label) {
      values.push(label);
    }

    const labelledBy = Utility.getNodeValue({
      node: element,
      name: 'aria-labelledby',
      type: DOMValueType.Attribute
    });
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

    const valueText = Utility.getNodeValue({
      node: element,
      name: 'aria-valuetext',
      type: DOMValueType.Attribute
    });
    if (valueText) {
      values.push(valueText);
    }

    const altText = Utility.getNodeValue({
      node: element,
      name: 'alt',
      type: DOMValueType.Attribute
    });
    if (altText) {
      values.push(altText);
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

import forEach from 'lodash/forEach';
import times from 'lodash/times';
import config from 'config';
import Aria from './aria';

export const CSS_UNIT_TYPE_REGEX = /(\d*\.?\d+)\s?(px|em|ex|%|in|cn|mm|pt|pc+)/;

const Utility = {
  Aria,

  /**
   * Adds class(es) to node(s).
   * IE compatible.
   *
   * @param node
   * @param klass
   */
  addClass: ({
    node,
    klass
  }: {
    node: NodeList | any;
    klass: string | string[];
  }): void => {
    if (node instanceof NodeList) {
      forEach(node, n => Utility.addClass({ node: n, klass }));
      return;
    }
    if (Array.isArray(klass)) {
      forEach(klass, k => Utility.addClass({ node, klass: k }));
      return;
    }
    if (node.classList) {
      node.classList.add(klass);
    } else if (!Utility.hasClass({ node, klass })) {
      node.className += ' ' + klass;
    }
  },

  /**
   * Add data attributes to Nodes using original property value.
   */
  addDataAttributeForProperty: ({
    node,
    property
  }: {
    node: NodeList | any;
    property: string | string[];
  }): { value: string; unitType: any } | void => {
    if (node instanceof NodeList) {
      forEach(node, n =>
        Utility.addDataAttributeForProperty({
          node: n,
          property
        })
      );
      return;
    }
    if (Array.isArray(property)) {
      forEach(property, p =>
        Utility.addDataAttributeForProperty({
          node,
          property: p
        })
      );
      return;
    }

    const dataAttributeName = Utility.getDataAttributeName(property);

    // Return any existing data before assigning new attribute.
    const existingValue = node.getAttribute(dataAttributeName);
    if (existingValue) {
      return Utility.getCSSUnitType(existingValue);
    }

    const prop = node.style.getPropertyValue(property);
    // Get computed value if property not explicitly assigned
    let value: string;
    if (prop && prop !== '') {
      value = prop;
    } else {
      value = window.getComputedStyle(node).getPropertyValue(property);
    }
    node.setAttribute(dataAttributeName, value);
    return Utility.getCSSUnitType(value);
  },

  getCSSUnitType: (value: string): any => {
    return value.match(CSS_UNIT_TYPE_REGEX);
  },

  /**
   * Get assigned data attribute value via property name or direct attribute name.
   * @param {Element} element
   * @param {string | undefined} name
   * @param {string | undefined} property
   * @returns {any}
   */
  getDataAttributeValue: ({
    element,
    name,
    property
  }: {
    element: Element;
    name?: string;
    property?: string;
  }): any => {
    if (!name && !property) {
      return;
    }
    if (property) {
      return element.getAttribute(Utility.getDataAttributeName(property));
    }
    if (name) {
      return element.getAttribute(name);
    }
  },

  /**
   * Removes CSSStyleDeclaration property.
   * @param {any} element
   * @param {string} property
   */
  removeProperty: ({
    element,
    property
  }: {
    element: any;
    property: string;
  }): void => {
    element.style.removeProperty(property);
  },

  /**
   * Sets CSSStyleDeclaration property.
   * @param {any} element
   * @param {string} property
   * @param {any} value
   */
  setProperty: ({
    element,
    property,
    value
  }: {
    element: any;
    property: string;
    value: any;
  }): void => {
    element.style.setProperty(property, value);
  },

  throwError: (message: string): void => {
    throw new Error(`[${config.widgetTitle}]: ${message}`);
  },

  /**
   * Generates a psuedo-random guid.
   * @returns {string}
   */
  generateGuid: (length: number = 8): string => {
    const iterations = Math.ceil(length / 11);
    const elements = times(iterations, (): string =>
      Math.random()
        .toString(36)
        .substring(2, 15)
    );

    return elements.join('').substring(0, length);
  },

  /**
   * Get the document body element.
   */
  getBody: () => {
    return document.getElementsByTagName('body')[0];
  },

  getNodeListFromQuery(query: string): NodeList {
    return document.querySelectorAll(query);
  },

  /**
   * Get custom data attribute name for property.
   * @returns {string}
   */
  getDataAttributeName(property: string): string {
    return `data-${config.widgetId}-original-${property}`;
  },

  /**
   * Determines if node has class.
   * IE compatible.
   *
   * @param node
   * @param klass
   * @returns {boolean}
   */
  hasClass: ({ node, klass }: { node: any; klass: string }) => {
    if (node.classList) {
      return node.classList.contains(klass);
    } else {
      return !!node.className.match(new RegExp('(\\s|^)' + klass + '(\\s|$)'));
    }
  },

  /**
   * Removes class(es) from node(s).
   * IE compatible.
   *
   * @param node
   * @param klass
   */
  removeClass: ({
    node,
    klass
  }: {
    node: NodeList | any;
    klass: string | string[];
  }): void => {
    if (node instanceof NodeList) {
      forEach(node, n => Utility.removeClass({ node: n, klass }));
      return;
    }
    if (Array.isArray(klass)) {
      forEach(klass, k => Utility.removeClass({ node, klass: k }));
      return;
    }
    if (node.classList) {
      node.classList.remove(klass);
    } else if (Utility.hasClass({ node, klass })) {
      const reg = new RegExp('(\\s|^)' + klass + '(\\s|$)');
      node.className = node.className.replace(reg, ' ');
    }
  },

  round(value: number, precision: number = 0): number {
    const y = +value + (precision === undefined ? 0.5 : precision / 2);
    return y - (y % (precision === undefined ? 1 : +precision));
  }
};

export default Utility;

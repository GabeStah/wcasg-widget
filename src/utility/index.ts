import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import transform from 'lodash/transform';
import times from 'lodash/times';
import config from 'config';

enum DOMValueType {
  Attribute = 'attribute',
  Style = 'style',
  Property = 'property'
}

const Utility = {
  /**
   * Converts bytes into larger readable format.
   *
   * @source https://gist.github.com/lanqy/5193417
   * @param {number} bytes
   * @returns {string}
   */
  bytesToSize: (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return 'n/a';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    if (i === 0) {
      return `${bytes} ${sizes[i]}`;
    }
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  },

  /**
   * Deep diff between two object, using lodash
   *
   * @source https://gist.github.com/Yimiprod/7ee176597fef230d1451
   * @param  {Object} object Object compared
   * @param  {Object} base   Object to compare with
   * @return {Object}        Return a new object who represent the diff
   */
  difference: (object: any, base: any) => {
    function changes(o: any, b: any[]) {
      return transform(o, (result: unknown[], value: object, key: any) => {
        if (!isEqual(value, b[key])) {
          result[key] =
            isObject(value) && isObject(b[key])
              ? changes(value, b[key])
              : value;
        }
      });
    }
    return changes(object, base);
  },

  /**
   * Get value by name and ValueType of specified node.
   *
   * @param {NodeList | Element | any} node
   * @param {string} name
   * @param {DOMValueType} type
   * @returns {string | void}
   */
  getNodeValue: ({
    node,
    name,
    type
  }: {
    node: NodeList | Element | any;
    name: string;
    type: DOMValueType;
  }): string => {
    if (type === DOMValueType.Attribute) {
      return node.getAttribute(name);
    }

    if (type === DOMValueType.Property) {
      return node[name];
    }

    if (type === DOMValueType.Style) {
      const value = node.style.getPropertyValue(name);
      if (value && value !== '') {
        return value;
      }
      return window.getComputedStyle(node).getPropertyValue(name);
    }

    return '';
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

  getNodeListFromQuery(query: string): NodeList {
    return document.querySelectorAll(query);
  },

  /**
   * Get value by name and ValueType of specified node.
   *
   * @param {NodeList | Element | any} node
   * @param {string} name
   * @param {DOMValueType} type
   * @returns {string | void}
   */
  removeNodeValue: ({
    node,
    name,
    type
  }: {
    node: NodeList | Element | any;
    name: string;
    type: DOMValueType;
  }): void => {
    if (type === DOMValueType.Attribute) {
      node.removeAttribute(name);
    }

    if (type === DOMValueType.Property) {
      delete node[name];
    }

    if (type === DOMValueType.Style) {
      node.style.removeProperty(name);
    }
  },

  /**
   * Set node value via name and ValueType.
   *
   * @param {NodeList | Element | any} node
   * @param {string} name
   * @param {DOMValueType} type
   * @param value
   * @param priority
   * @returns {string | void}
   */
  setNodeValue: ({
    node,
    name,
    type,
    value,
    priority
  }: {
    node: NodeList | Element | any;
    name: string;
    type: DOMValueType;
    value: any;
    priority?: string;
  }): void => {
    if (type === DOMValueType.Attribute) {
      node.setAttribute(name, value);
    }

    if (type === DOMValueType.Property) {
      node[name] = value;
    }

    if (type === DOMValueType.Style) {
      node.style.setProperty(name, value, priority);
    }
  },

  throwError: (message: string): void => {
    throw new Error(`[${config.widgetTitle}]: ${message}`);
  }
};

export default Utility;

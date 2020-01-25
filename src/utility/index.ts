import times from 'lodash/times';
import config from 'config';
import Aria from '@/utility/aria';
import Css from '@/utility/css';
import Data from '@/utility/data';
import { DOMValueType } from 'plugins/action';

const Utility = {
  Aria,
  Css,
  Data,

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
    if (type === DOMValueType.Style) {
      const value = node.style.getPropertyValue(name);
      if (value && value !== '') {
        return value;
      }
      return window.getComputedStyle(node).getPropertyValue(name);
    }

    if (type === DOMValueType.Property) {
      return node[name];
    }

    if (type === DOMValueType.Attribute) {
      return node.getAttribute(name);
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

  throwError: (message: string): void => {
    throw new Error(`[${config.widgetTitle}]: ${message}`);
  },

  round(value: number, precision: number = 0): number {
    const y = +value + (precision === undefined ? 0.5 : precision / 2);
    return y - (y % (precision === undefined ? 1 : +precision));
  }
};

export default Utility;

import { AudioUtilities as Audio } from '@/utility/audio';
import Auth from '@/utility/auth';
import Html from '@/utility/html';
import Store from '@/utility/store';
import times from 'lodash/times';
import config from 'config';
import Aria from '@/utility/aria';
import Css from '@/utility/css';
import Data from '@/utility/data';
import Plugin from '@/utility/plugin';
import { DOMValueType } from 'classes/plugin/action';

const Utility = {
  Aria,
  Audio,
  Auth,
  Css,
  Data,
  Html,
  Plugin,
  Store,

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
  },

  round(value: number, precision: number = 0): number {
    const y = +value + (precision === undefined ? 0.5 : precision / 2);
    return y - (y % (precision === undefined ? 1 : +precision));
  }
};

export default Utility;

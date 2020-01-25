import forEach from 'lodash/forEach';
import Utility from '@/utility';

export const CSS_UNIT_TYPE_REGEX = /(\d*\.?\d+)\s?(px|em|ex|%|in|cn|mm|pt|pc+)/;

export const Css = {
  /**
   * Adds class(es) to node(s).
   * IE compatible.
   *
   * @param node
   * @param name
   */
  addClass: ({
    node,
    name
  }: {
    node: NodeList | any;
    name: string | string[];
  }): void => {
    if (node instanceof NodeList) {
      forEach(node, nodeValue =>
        Utility.Css.addClass({ node: nodeValue, name })
      );
      return;
    }
    if (Array.isArray(name)) {
      forEach(name, nameValue =>
        Utility.Css.addClass({ node, name: nameValue })
      );
      return;
    }
    if (node.classList) {
      node.classList.add(name);
    } else if (!Utility.Css.hasClass({ node, name })) {
      node.className += ' ' + name;
    }
  },

  getUnitType: (value: string): any => {
    return value.match(CSS_UNIT_TYPE_REGEX);
  },

  /**
   * Determines if node has class.
   * IE compatible.
   *
   * @param node
   * @param name
   * @returns {boolean}
   */
  hasClass: ({ node, name }: { node: any; name: string }) => {
    if (node.classList) {
      return node.classList.contains(name);
    } else {
      return !!node.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
    }
  },

  /**
   * Removes class(es) from node(s).
   * IE compatible.
   *
   * @param node
   * @param name
   */
  removeClass: ({
    node,
    name
  }: {
    node: NodeList | any;
    name: string | string[];
  }): void => {
    if (node instanceof NodeList) {
      forEach(node, nodeValue =>
        Utility.Css.removeClass({ node: nodeValue, name })
      );
      return;
    }
    if (Array.isArray(name)) {
      forEach(name, nameValue => {
        Utility.Css.removeClass({ node, name: nameValue });
      });
      return;
    }
    if (node.classList) {
      node.classList.remove(name);
    } else if (Utility.Css.hasClass({ node, name })) {
      const reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
      node.className = node.className.replace(reg, ' ');
    }
  },

  /**
   * Removes CSSStyleDeclaration style value.
   * @param {any} element
   * @param {string} property
   */
  removeStyle: ({ element, name }: { element: any; name: string }): void => {
    element.style.removeProperty(name);
  },

  /**
   * Sets CSSStyleDeclaration style value.
   * @param {any} element
   * @param {string} property
   * @param {any} value
   */
  setStyle: ({
    element,
    name,
    value
  }: {
    element: any;
    name: string;
    value: any;
  }): void => {
    element.style.setProperty(name, value);
  }
};

export default Css;

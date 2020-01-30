import forEach from 'lodash/forEach';

import globalStyles from 'styles/global.scss';

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
      forEach(node, nodeValue => Css.addClass({ node: nodeValue, name }));
      return;
    }
    if (Array.isArray(name)) {
      forEach(name, nameValue => Css.addClass({ node, name: nameValue }));
      return;
    }
    if (node.classList) {
      node.classList.add(name);
    } else if (!Css.hasClass({ node, name })) {
      node.className += ' ' + name;
    }
  },

  /**
   * Get all class-based-focus nodes.
   *
   * @returns {any}
   */
  clearAllFocused: (): any => {
    const focusedNodes = Css.selectAllWithClass({
      name: globalStyles['wcasg-ada-app-focused']
    });
    if (focusedNodes && focusedNodes.length > 0) {
      forEach(focusedNodes, (node: any) =>
        Css.removeClass({ node, name: globalStyles['wcasg-ada-app-focused'] })
      );
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
      forEach(node, nodeValue => Css.removeClass({ node: nodeValue, name }));
      return;
    }
    if (Array.isArray(name)) {
      forEach(name, nameValue => {
        Css.removeClass({ node, name: nameValue });
      });
      return;
    }
    if (node.classList) {
      node.classList.remove(name);
    } else if (Css.hasClass({ node, name })) {
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
   * Get all nodes with matching class name.
   *
   * @param {string} name
   * @returns {any}
   */
  selectAllWithClass: ({ name }: { name: string }): any => {
    return document.getElementsByClassName(name);
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

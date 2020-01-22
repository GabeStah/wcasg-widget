import forEach from 'lodash/forEach';
import isArrayLike from 'lodash/isArrayLike';
import times from 'lodash/times';

const Utility = {
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
    } else if (Array.isArray(klass)) {
      forEach(klass, k => Utility.addClass({ node, klass: k }));
    }
    if (typeof klass === 'string') {
      if (node.classList) {
        node.classList.add(klass);
      } else if (!Utility.hasClass({ node, klass })) {
        node.className += ' ' + klass;
      }
    }
  },

  /**
   * Generates a psuedo-random guid.
   * @returns {string}
   */
  generateGuid: (length: number = 32): string => {
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
    } else if (Array.isArray(klass)) {
      forEach(klass, k => Utility.removeClass({ node, klass: k }));
    }
    if (typeof klass === 'string') {
      if (node.classList) {
        node.classList.remove(klass);
      } else if (Utility.hasClass({ node, klass })) {
        const reg = new RegExp('(\\s|^)' + klass + '(\\s|$)');
        node.className = node.className.replace(reg, ' ');
      }
    }
  }
};

export default Utility;

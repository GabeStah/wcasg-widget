const Utility = {
  /**
   * Adds className to node.
   * IE compatible.
   *
   * @param node
   * @param className
   */
  addClass: ({ node, className }: { node: any; className: any }) => {
    if (node.classList) {
      node.classList.add(className);
    } else if (!Utility.hasClass({ node, className })) {
      node.className += ' ' + className;
    }
  },

  /**
   * Get the document body element.
   */
  getBody: () => {
    return document.getElementsByTagName('body')[0];
  },

  /**
   * Determines if node has className.
   * IE compatible.
   *
   * @param node
   * @param className
   * @returns {boolean}
   */
  hasClass: ({ node, className }: { node: any; className: any }) => {
    if (node.classList) {
      return node.classList.contains(className);
    } else {
      return !!node.className.match(
        new RegExp('(\\s|^)' + className + '(\\s|$)')
      );
    }
  },

  /**
   * Removes className from node.
   * IE compatible.
   *
   * @param node
   * @param className
   */
  removeClass: ({
    node,
    className
  }: {
    node: any;
    className: string | string[];
  }) => {
    if (Array.isArray(className)) {
      className.forEach(name => Utility.removeClass({ node, className: name }));
    } else {
      if (node.classList) {
        node.classList.remove(className);
      } else if (Utility.hasClass({ node, className })) {
        const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        node.className = node.className.replace(reg, ' ');
      }
    }
  }
};

export default Utility;

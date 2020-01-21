const utilities = {
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
    } else if (!utilities.hasClass({ node, className })) {
      node.className += ' ' + className;
    }
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
  removeClass: ({ node, className }: { node: any; className: any }) => {
    if (node.classList) {
      node.classList.remove(className);
    } else if (utilities.hasClass({ node, className })) {
      const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      node.className = node.className.replace(reg, ' ');
    }
  }
};

export default utilities;

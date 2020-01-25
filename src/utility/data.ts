import forEach from 'lodash/forEach';
import config from 'config';
import { DOMValueType } from 'plugins/action';
import Utility from '@/utility';

export const Data = {
  /**
   * Add data attributes to Nodes using original property value.
   */
  createOriginalDataAttribute: ({
    node,
    name,
    type
  }: {
    node: NodeList | any;
    name: string | string[];
    type: DOMValueType;
  }): void => {
    if (node instanceof NodeList) {
      forEach(node, nodeValue =>
        Utility.Data.createOriginalDataAttribute({
          node: nodeValue,
          name,
          type
        })
      );
      return;
    }
    if (Array.isArray(name)) {
      forEach(name, nameValue =>
        Utility.Data.createOriginalDataAttribute({
          node,
          name: nameValue,
          type
        })
      );
      return;
    }

    const dataAttributeName = Utility.Data.generateDataAttributeName({
      name,
      type
    });

    // Get value
    const value = Utility.getNodeValue({ node, name, type });

    // Explicitly setting data attribute
    Utility.setNodeValue({
      node,
      value,
      type: DOMValueType.Attribute,
      name: dataAttributeName
    });
  },

  /**
   * Get custom data attribute name for property.
   * @returns {string}
   */
  generateDataAttributeName({
    name,
    type
  }: {
    name: string;
    type: DOMValueType;
  }): string {
    return `data-${config.widgetId}-original-${type.toString()}-${name}`;
  }
};

export default Data;

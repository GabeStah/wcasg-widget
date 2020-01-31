import forEach from 'lodash/forEach';
import config from 'config';
import Utility from '@/utility';

enum DOMValueType {
  Attribute = 'attribute',
  Style = 'style',
  Property = 'property'
}

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
        Data.createOriginalDataAttribute({
          node: nodeValue,
          name,
          type
        })
      );
      return;
    }
    if (Array.isArray(name)) {
      forEach(name, nameValue =>
        Data.createOriginalDataAttribute({
          node,
          name: nameValue,
          type
        })
      );
      return;
    }

    const dataAttributeName = Data.generateDataAttributeName({
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

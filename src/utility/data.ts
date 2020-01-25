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
  }): { value: string; unitType: any } | void => {
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

    // Return any existing data before assigning new attribute.
    const existingValue = node.getAttribute(dataAttributeName);
    if (existingValue) {
      return Utility.Css.getUnitType(existingValue);
    }

    const prop = node.style.getPropertyValue(name);
    // Get computed value if property not explicitly assigned
    let value: string;
    if (prop && prop !== '') {
      value = prop;
    } else {
      value = window.getComputedStyle(node).getPropertyValue(name);
    }
    node.setAttribute(dataAttributeName, value);
    return Utility.Css.getUnitType(value);
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

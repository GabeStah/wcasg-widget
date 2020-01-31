import Utility from '@/utility';
import Css from '@/utility/css';
import Data from '@/utility/data';
import {
  DOMValueType,
  IPluginAction,
  IPluginActionOptions,
  IPluginActionParams,
  PluginAction,
  ValueManipulationType
} from 'classes/plugin/action';

export interface IPluginActionPropertyOptions extends IPluginActionOptions {
  // Name of property (e.g. 'font-size')
  name: string;
  // Method of scaling property value
  manipulationType: ValueManipulationType;
  // Value applied for Direct manipulation type when enabled.
  enabledValue?: any;
  // Value applied for Direct manipulation type when disabled.
  disabledValue?: any;
  // Base value if no original value can be determined
  baseValue?: any;
}

export interface IPluginActionProperty extends IPluginAction {
  property: IPluginActionPropertyOptions;
}

interface IPluginActionPropertyParams extends IPluginActionParams {
  property: IPluginActionPropertyOptions;
}

/**
 * PluginAction that manipulates CSS styles on DOM nodes.
 */
export class PluginActionProperty extends PluginAction
  implements IPluginActionProperty {
  public property: IPluginActionPropertyOptions;
  public domValueType: DOMValueType = DOMValueType.Property;

  constructor(params: IPluginActionPropertyParams) {
    super(params);
    this.property = params.property;

    this.initialize(this);
  }

  public initialize = (self: any): void => {
    // Initialize by generating original data attributes for property
    this.addDataAttributeForProperties();
  };

  public enable(params?: any): void {
    this.nodeList.forEach((node: any) => {
      // If absolute or scaling get calculated value
      if (
        [
          ValueManipulationType.AbsoluteScaling,
          ValueManipulationType.PercentageScaling
        ].includes(this.property.manipulationType)
      ) {
        const { factor } = params;
        Utility.setNodeValue({
          node,
          name: this.property.name,
          type: this.domValueType,
          value: this.getCalculatedPropertyValue(factor, node)
        });
      } else if (
        this.property.manipulationType === ValueManipulationType.Toggle
      ) {
        // If toggle, set to enabledValue (or remove if enabledValue is null)
        if (this.property.enabledValue !== undefined) {
          Utility.setNodeValue({
            node,
            name: this.property.name,
            type: this.domValueType,
            value: this.property.enabledValue
          });
        } else {
          Utility.removeNodeValue({
            node,
            name: this.property.name,
            type: this.domValueType
          });
        }
      } else if (
        this.property.manipulationType === ValueManipulationType.Direct
      ) {
        // If direct, set to enabledValue (or remove if enabledValue is null)
        if (this.property.enabledValue !== undefined) {
          Utility.setNodeValue({
            node,
            name: this.property.name,
            type: this.domValueType,
            value: this.property.enabledValue
          });
        } else {
          Utility.removeNodeValue({
            node,
            name: this.property.name,
            type: this.domValueType
          });
        }
      }
    });
  }

  /**
   * Reset all applied properties to original values from saved data attribute
   */
  public disable(): void {
    this.nodeList.forEach((node: any) => {
      let value = this.property.disabledValue;
      // If absolute, scaling, or toggled reset to original value
      if (
        [
          ValueManipulationType.AbsoluteScaling,
          ValueManipulationType.PercentageScaling,
          ValueManipulationType.Toggle
        ].includes(this.property.manipulationType)
      ) {
        // Get original from data attribute
        value = Utility.getNodeValue({
          node,
          name: Data.generateDataAttributeName({
            name: this.property.name,
            type: this.domValueType
          }),
          type: DOMValueType.Attribute
        });
      }
      // Set prop to disableValue unless null, then remove property.
      if (value !== undefined) {
        Utility.setNodeValue({
          node,
          name: this.property.name,
          type: this.domValueType,
          value
        });
      } else {
        Utility.removeNodeValue({
          node,
          name: this.property.name,
          type: this.domValueType
        });
      }
    });
  }

  protected addDataAttributeForProperties(): void {
    Data.createOriginalDataAttribute({
      node: this.nodeList,
      name: this.property.name,
      type: this.domValueType
    });
  }

  protected getCalculatedPropertyValue(
    scalingFactor: number,
    element: Element
  ): any {
    const propertyName = this.property.name;
    const baseValue = this.property.baseValue || '0';
    // Get original data attribute value
    const originalValue = Utility.getNodeValue({
      node: element,
      name: Data.generateDataAttributeName({
        name: propertyName,
        type: this.domValueType
      }),
      type: DOMValueType.Attribute
    });

    const parsedOriginalValue = parseFloat(originalValue);
    let numericValue = parsedOriginalValue;

    // If original value non-numeric, use base value
    if (isNaN(parsedOriginalValue)) {
      numericValue = parseFloat(baseValue);
    }

    if (!this.property.unitType) {
      const unitMatches = Css.getUnitType(originalValue);
      if (unitMatches) {
        this.property.unitType = unitMatches[2];
      }
    }

    // If percentage scaling and original and base value are zero, report
    if (
      this.property.manipulationType ===
        ValueManipulationType.PercentageScaling &&
      numericValue === 0 &&
      parseFloat(baseValue) === 0
    ) {
      Utility.throwError(
        `Cannot use 'DOMPropertyScalingType.Percentage' for property: ${this.property.name} which has an original and base value of zero.`
      );
    }

    // If percentage scaling and original and base value are zero, report
    if (this.property.unitType === undefined) {
      Utility.throwError(
        `Unable to detect valid unit type for original property value of '${this.property.name}.'  Please explicitly assign expected 'unitType' in configuration.`
      );
    }

    // Apply scaling
    if (
      this.property.manipulationType === ValueManipulationType.AbsoluteScaling
    ) {
      return `${numericValue + scalingFactor}${this.property.unitType}`;
    } else if (
      this.property.manipulationType === ValueManipulationType.PercentageScaling
    ) {
      // If value is zero scaling will fail, so use base value
      return `${numericValue * (1 + scalingFactor)}${this.property.unitType}`;
    }
  }
}

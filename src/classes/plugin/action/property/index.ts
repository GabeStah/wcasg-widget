import Utility from '@/utility';
import {
  DOMValueType,
  IPluginAction,
  IPluginActionParams,
  IPluginActionPropertyOptions,
  PluginAction,
  ValueManipulationType
} from 'classes/plugin/action';

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

    // Initialize by generating original data attributes for property
    this.addDataAttributeForProperties();
  }

  protected addDataAttributeForProperties(): void {
    Utility.Data.createOriginalDataAttribute({
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
      name: Utility.Data.generateDataAttributeName({
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
      const unitMatches = Utility.Css.getUnitType(originalValue);
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

  // tslint:disable-next-line:member-ordering
  public enable(params?: any): void {
    this.nodeList.forEach((node: any) => {
      // If absolute or scaling get calculated value
      if (
        [
          ValueManipulationType.AbsoluteScaling,
          ValueManipulationType.PercentageScaling
        ].includes(this.property.manipulationType)
      ) {
        const { scalingFactor } = params;
        Utility.setNodeValue({
          node,
          name: this.property.name,
          type: this.domValueType,
          value: this.getCalculatedPropertyValue(scalingFactor, node)
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
  // tslint:disable-next-line:member-ordering
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
          name: Utility.Data.generateDataAttributeName({
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

  /**
   * Remove all applied classes, then reapply classes if enabled.
   */
  // tslint:disable-next-line:member-ordering
  public reset(): void {
    // TODO: Remove properties from nodes
  }
}

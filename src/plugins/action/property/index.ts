import Utility from '@/utility';
import {
  IPluginAction,
  IPluginActionParams,
  PluginAction
} from 'plugins/action';

export enum DOMPropertyManipulationType {
  PercentageScaling,
  AbsoluteScaling,
  Toggle,
  Direct
}

interface DOMProperty {
  // Name of property (e.g. 'font-size')
  name: string;
  // Method of scaling property value
  manipulationType: DOMPropertyManipulationType;
  // Value applied for Direct manipulation type when enabled.
  enabledValue?: string | null;
  // Value applied for Direct manipulation type when disabled.
  disabledValue?: string | null;
  // Base value if no original value can be determined
  baseValue?: string;
  // (Optional) Unit type to be used for property (e.g. 'px', 'em', etc)
  unitType?: string;
}

export interface IPluginActionProperty extends IPluginAction {
  property: DOMProperty;
}

interface IPluginActionPropertyParams extends IPluginActionParams {
  property: DOMProperty;
}

/**
 * PluginAction that adds / removes CSS style properties from Nodes.
 */
export class PluginActionProperty extends PluginAction
  implements IPluginActionProperty {
  public property: DOMProperty;

  constructor(params: IPluginActionPropertyParams) {
    super(params);
    this.property = params.property;

    // Initialize by generating original data attributes for property
    this.addDataAttributeForProperties();
  }

  protected addDataAttributeForProperties(): void {
    Utility.addDataAttributeForProperty({
      node: this.nodeList,
      property: this.property.name
    });
  }

  protected getCalculatedPropertyValue(
    scalingFactor: number,
    element: Element
  ): any {
    const propertyName = this.property.name;
    const baseValue = this.property.baseValue || '0';
    // Get original data attribute value
    const originalValue = Utility.getDataAttributeValue({
      element,
      property: propertyName
    });

    const parsedOriginalValue = parseFloat(originalValue);
    let numericValue = parsedOriginalValue;

    // If original value non-numeric, use base value
    if (isNaN(parsedOriginalValue)) {
      numericValue = parseFloat(baseValue);
    }

    if (!this.property.unitType) {
      const unitMatches = Utility.getCSSUnitType(originalValue);
      if (unitMatches) {
        this.property.unitType = unitMatches[2];
      }
    }

    // If percentage scaling and original and base value are zero, report
    if (
      this.property.manipulationType ===
        DOMPropertyManipulationType.PercentageScaling &&
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
      this.property.manipulationType ===
      DOMPropertyManipulationType.AbsoluteScaling
    ) {
      return `${numericValue + scalingFactor}${this.property.unitType}`;
    } else if (
      this.property.manipulationType ===
      DOMPropertyManipulationType.PercentageScaling
    ) {
      // If value is zero scaling will fail, so use base value
      return `${numericValue * (1 + scalingFactor)}${this.property.unitType}`;
    }
  }

  // tslint:disable-next-line:member-ordering
  public enable(params?: any): void {
    console.log(`property/index:enable(), nodeList for name: ${this.name}`);
    console.log(this.nodeList);
    console.log(this.nodeList.length);
    let counter = 0;
    this.nodeList.forEach((node: any) => {
      counter++;
      console.log(`Counter total: ${counter}`);
      // If absolute or scaling get calculated value
      if (
        [
          DOMPropertyManipulationType.AbsoluteScaling,
          DOMPropertyManipulationType.PercentageScaling
        ].includes(this.property.manipulationType)
      ) {
        const { scalingFactor } = params;
        Utility.setProperty({
          element: node,
          property: this.property.name,
          value: this.getCalculatedPropertyValue(scalingFactor, node)
        });
      } else if (
        this.property.manipulationType === DOMPropertyManipulationType.Toggle
      ) {
        // If toggle, set to enabledValue (or remove if enabledValue is null)
        if (this.property.enabledValue) {
          console.log(`action/property:enable`);
          console.log(this.id);
          console.log(this.property);
          console.log(node);
          Utility.setProperty({
            element: node,
            property: this.property.name,
            value: this.property.enabledValue
          });
        } else {
          Utility.removeProperty({
            element: node,
            property: this.property.name
          });
        }
      } else if (
        this.property.manipulationType === DOMPropertyManipulationType.Direct
      ) {
        // If direct, set to enabledValue (or remove if enabledValue is null)
        if (this.property.enabledValue) {
          Utility.setProperty({
            element: node,
            property: this.property.name,
            value: this.property.enabledValue
          });
        } else {
          Utility.removeProperty({
            element: node,
            property: this.property.name
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
    console.log(`property/index:disable() for ${this.name}`);
    this.nodeList.forEach((node: any) => {
      let value = this.property.disabledValue;
      // If absolute, scaling, or toggled reset to original value
      if (
        [
          DOMPropertyManipulationType.AbsoluteScaling,
          DOMPropertyManipulationType.PercentageScaling,
          DOMPropertyManipulationType.Toggle
        ].includes(this.property.manipulationType)
      ) {
        value = Utility.getDataAttributeValue({
          element: node,
          property: this.property.name
        });
      }
      // Set prop to disableValue unless null, then remove property.
      if (value) {
        console.log(`property/index:disable(), value: ${value}`);
        Utility.setProperty({
          element: node,
          property: this.property.name,
          value
        });
      } else {
        console.log(
          `property/index:disable(), removeProperty: ${this.property}`
        );
        Utility.removeProperty({
          element: node,
          property: this.property.name
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

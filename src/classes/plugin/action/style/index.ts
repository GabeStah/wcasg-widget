import Utility from '@/utility';
import {
  DOMValueType,
  IPluginAction,
  IPluginActionOptions,
  IPluginActionParams,
  PluginAction,
  ValueManipulationType
} from 'classes/plugin/action';

export interface IPluginActionStyleOptions extends IPluginActionOptions {
  // Name of property (e.g. 'font-size')
  name: string;
  // Method of scaling property value
  manipulationType: ValueManipulationType;
  // Value applied for Direct manipulation type when enabled.
  enabledValue?: any;
  // Value applied for Direct manipulation type when disabled.
  disabledValue?: any;
  // Base value if no original value can be determined
  baseValue?: string;
  // Unit type to be used for property (e.g. 'px', 'em', etc)
  unitType?: string;
}

export interface IPluginActionStyle extends IPluginAction {
  style: IPluginActionStyleOptions;
}

interface IPluginActionStyleParams extends IPluginActionParams {
  style: IPluginActionStyleOptions;
}

/**
 * PluginAction that manipulates CSS styles on DOM nodes.
 */
export class PluginActionStyle extends PluginAction
  implements IPluginActionStyle {
  public style: IPluginActionStyleOptions;
  public domValueType: DOMValueType = DOMValueType.Style;

  constructor(params: IPluginActionStyleParams) {
    super(params);
    this.style = params.style;

    this.initialize(this);
  }

  public initialize = (self: any): void => {
    // Initialize by generating original data attributes for property
    this.addDataAttributeForStyles();
  };

  public enable(params?: any): void {
    this.nodeList.forEach((node: any) => {
      // If absolute or scaling get calculated value
      if (
        [
          ValueManipulationType.AbsoluteScaling,
          ValueManipulationType.PercentageScaling
        ].includes(this.style.manipulationType)
      ) {
        const { scalingFactor } = params;
        Utility.setNodeValue({
          node,
          name: this.style.name,
          type: this.domValueType,
          value: this.getCalculatedStyleValue(scalingFactor, node)
        });
      } else if (this.style.manipulationType === ValueManipulationType.Toggle) {
        // If toggle, set to enabledValue (or remove if enabledValue is null)
        if (this.style.enabledValue !== undefined) {
          Utility.setNodeValue({
            node,
            name: this.style.name,
            type: this.domValueType,
            value: this.style.enabledValue
          });
        } else {
          Utility.removeNodeValue({
            node,
            name: this.style.name,
            type: this.domValueType
          });
        }
      } else if (this.style.manipulationType === ValueManipulationType.Direct) {
        // If direct, set to enabledValue (or remove if enabledValue is null)
        if (this.style.enabledValue !== undefined) {
          Utility.setNodeValue({
            node,
            name: this.style.name,
            type: this.domValueType,
            value: this.style.enabledValue
          });
        } else {
          Utility.removeNodeValue({
            node,
            name: this.style.name,
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
      let value = this.style.disabledValue;
      // If absolute, scaling, or toggled reset to original value
      if (
        [
          ValueManipulationType.AbsoluteScaling,
          ValueManipulationType.PercentageScaling,
          ValueManipulationType.Toggle
        ].includes(this.style.manipulationType)
      ) {
        value = Utility.getNodeValue({
          node,
          name: Utility.Data.generateDataAttributeName({
            name: this.style.name,
            type: this.domValueType
          }),
          type: DOMValueType.Attribute
        });
      }
      // Set prop to disableValue unless null, then remove property.
      if (value !== undefined) {
        Utility.setNodeValue({
          node,
          name: this.style.name,
          type: this.domValueType,
          value
        });
      } else {
        Utility.removeNodeValue({
          node,
          name: this.style.name,
          type: this.domValueType
        });
      }
    });
  }

  protected addDataAttributeForStyles(): void {
    Utility.Data.createOriginalDataAttribute({
      node: this.nodeList,
      name: this.style.name,
      type: this.domValueType
    });
  }

  protected getCalculatedStyleValue(
    scalingFactor: number,
    element: Element
  ): any {
    const styleName = this.style.name;
    const baseValue = this.style.baseValue || '0';
    // Get original data attribute value
    const originalValue = Utility.getNodeValue({
      node: element,
      name: Utility.Data.generateDataAttributeName({
        name: styleName,
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

    if (!this.style.unitType) {
      const unitMatches = Utility.Css.getUnitType(originalValue);
      if (unitMatches) {
        this.style.unitType = unitMatches[2];
      }
    }

    // If percentage scaling and original and base value are zero, report
    if (
      this.style.manipulationType === ValueManipulationType.PercentageScaling &&
      numericValue === 0 &&
      parseFloat(baseValue) === 0
    ) {
      Utility.throwError(
        `Cannot use 'DOMPropertyScalingType.Percentage' for style: ${this.style.name} which has an original and base value of zero.`
      );
    }

    // If percentage scaling and original and base value are zero, report
    if (this.style.unitType === undefined) {
      Utility.throwError(
        `Unable to detect valid unit type for original style value of '${this.style.name}.'  Please explicitly assign expected 'unitType' in configuration.`
      );
    }

    // Apply scaling
    if (this.style.manipulationType === ValueManipulationType.AbsoluteScaling) {
      return `${numericValue + scalingFactor}${this.style.unitType}`;
    } else if (
      this.style.manipulationType === ValueManipulationType.PercentageScaling
    ) {
      // If value is zero scaling will fail, so use base value
      return `${numericValue * (1 + scalingFactor)}${this.style.unitType}`;
    }
  }
}

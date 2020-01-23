import Utility from '@/utility';
import { IPluginAction, PluginAction } from 'plugins/action';

export enum DOMPropertyScalingType {
  Percentage,
  Absolute
}

interface DOMProperty {
  // Name of property (e.g. 'font-size')
  name: string;
  // Method of scaling property value
  scalingType: DOMPropertyScalingType;
  // Base value if no original value can be determined
  baseValue?: string;
  // (Optional) Unit type to be used for property (e.g. 'px', 'em', etc)
  unitType?: string;
}

/**
 * ActionProperty holds property name
 * parent ActionElement passes value to apply
 */

/**
 * IProperty
 * name
 * baseValue
 *
 */

export interface IPluginActionProperty extends IPluginAction {
  property: DOMProperty;
  node: NodeList | string | string[];
}

interface IPluginActionPropertyParams {
  property: DOMProperty;
  id?: string;
  node?: NodeList | string | string[];
}

/**
 * PluginAction that adds / removes CSS style properties from Nodes.
 */
export class PluginActionProperty extends PluginAction
  implements IPluginActionProperty {
  public property: DOMProperty;
  public node: NodeList | string | string[] = 'body';
  private _nodeList!: NodeListOf<Element> | NodeList;

  constructor(params: IPluginActionPropertyParams) {
    super(params);
    this.property = params.property;

    if (params.node) {
      this.node = params.node;
    }

    // Assign nodes
    this.initializeNodeList();

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
      this.property.scalingType === DOMPropertyScalingType.Percentage &&
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
    if (this.property.scalingType === DOMPropertyScalingType.Absolute) {
      return `${numericValue + scalingFactor}${this.property.unitType}`;
    } else if (
      this.property.scalingType === DOMPropertyScalingType.Percentage
    ) {
      // If value is zero scaling will fail, so use base value
      return `${numericValue * (1 + scalingFactor)}${this.property.unitType}`;
    }
  }

  /**
   * Sets applicable DOM node list based on passed nodes property.
   * @returns {any}
   */
  private initializeNodeList(): any {
    if (this.node instanceof NodeList) {
      this._nodeList = this.node;
    } else {
      this._nodeList = document.querySelectorAll(
        Array.isArray(this.node) ? this.node.join(', ') : this.node
      );
    }
  }

  get nodeList() {
    return this._nodeList;
  }

  // tslint:disable-next-line:member-ordering
  public enable({ scalingFactor }: { scalingFactor: number }): void {
    // console.info(`property/index.ts.enable(${scalingFactor}`);
    this.nodeList.forEach((node: any) => {
      const value = this.getCalculatedPropertyValue(scalingFactor, node);
      // console.info(`property/index.ts.enable, value: ${value}`);
      Utility.setProperty({
        element: node,
        property: this.property.name,
        value: value
      });
    });
  }

  /**
   * Reset all applied properties to original values from saved data attribute
   */
  // tslint:disable-next-line:member-ordering
  public disable(): void {
    this.nodeList.forEach((node: any) => {
      Utility.setProperty({
        element: node,
        property: this.property.name,
        value: Utility.getDataAttributeValue({
          element: node,
          property: this.property.name
        })
      });
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
